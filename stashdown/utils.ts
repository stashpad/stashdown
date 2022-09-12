const findAncestor = (el: Node) => {
  // @ts-ignore
  while ((el = el.parentNode) && !(el as HTMLElement).dataset?.['originStart']);
  return el;
}

const adjustByParentType = (node: Node) => {
  console.log('node', node.nodeName)
  const dataset = (node as HTMLElement).dataset
  console.log('dataset', dataset)
  if (node.nodeName === 'STRONG') return 2
  if (node.nodeName === 'EM') return 1
  if (node.nodeName === 'DEL') return 2

  if (node.nodeName === 'PRE') {
    return 4 // TODO: + lang length
  }
  
  // check parents for nesting level? nested lists sometimes return -1
  if (node.nodeName === 'LI') {

    // does li contain an input?
    if (Array.from(node.childNodes).find(x => x.nodeName === 'INPUT')) {
      return 5
    }

    return 2
  }

  if (dataset?.hashHeader === 'false') return 0
  if (node.nodeName === 'H1') return 2
  if (node.nodeName === 'H2') return 3
  if (node.nodeName === 'H3') return 4
  if (node.nodeName === 'H4') return 5
  if (node.nodeName === 'H5') return 6
  if (node.nodeName === 'H6') return 7
  return 0
}

export const calculateAndSetClickPosition = (e: React.MouseEvent<HTMLElement>, isDoubleClick: boolean) => {
  let insertionLocation = 0 // todo: byte.length?
  console.log('target', e.target)
  // console.log
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return

  const selection = window.getSelection()
  if (!selection) return
  const focusNode = selection.focusNode
  console.log('focusNode', focusNode, selection)

  const selectionStart = isDoubleClick ? selection.anchorOffset : selection.focusOffset
  console.log('selection start', selectionStart)

  const selectionLength = selection.focusOffset - selectionStart

  if (!focusNode) return
  if (focusNode.nodeType === 1) {
    // setCursorLocation(0)
    // what was this?
    return
  }

  if (focusNode.nodeType === 3) {
    // get starting position depending on single or double click
    // search target for matching inner text
    const validAncestor = findAncestor(focusNode)
    const adjustment = adjustByParentType(validAncestor)

    const dataset = (validAncestor as HTMLElement).dataset
    if (dataset.originStart) {
      let childrenWithinAncestor = Array.from(validAncestor.childNodes)
      if (validAncestor.nodeName === 'PRE') {
        childrenWithinAncestor = Array.from(validAncestor.firstChild?.childNodes ?? [])
      }

      const focusNodeIndexInChildren = childrenWithinAncestor.indexOf(focusNode as ChildNode)
      if (focusNodeIndexInChildren < 0) {
        return [insertionLocation]
      }

      let prevChildrenLength = 0
      if (focusNodeIndexInChildren > 0) {
        const allLengths = childrenWithinAncestor.slice(0, focusNodeIndexInChildren).map(x => x.textContent?.length).filter(x => !!x) as number[]
        if (allLengths.length) prevChildrenLength = allLengths.reduce((acc, val) => acc += val) ?? 0
      }

      insertionLocation = parseInt(dataset.originStart) + selectionStart + prevChildrenLength + adjustment
    }

    // set selection range or cursor position depending on single or double click
    if (isDoubleClick) {
      return [insertionLocation, insertionLocation + selectionLength]
    } else {
      return [insertionLocation]
    }
  }
};
