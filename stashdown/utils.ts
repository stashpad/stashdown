const findAncestor = (el: Node) => {
  while ((el.parentNode) && !(el as HTMLElement).dataset?.['originStart']) {
    el = el.parentNode
  };
  return el;
}

const findNumberOfListAncestors = (el: Node) => {
  let count = 0
  while ((el.parentNode)) {
    if (el.nodeName === 'UL' || el.nodeName === 'OL') count++
    el = el.parentNode
  };
  return count
}

const findAncestorByType = (el: Node, type: string) => {
  while ((el.parentNode)) {
    if (el.nodeName === type) return el
    el = el.parentNode
  };
  return null
}

const adjustByParentType = (node: Node) => {
  const dataset = (node as HTMLElement).dataset
  if (node.nodeName === 'STRONG') return 2
  if (node.nodeName === 'EM') return 1
  if (node.nodeName === 'DEL') return 2

  if (node.nodeName === 'PRE') {
    const codeBlock = Array.from(node.childNodes).find(n => n.nodeName === 'CODE')
    const lang = Array.from((codeBlock as HTMLElement).classList).find(x => x.includes('language'))
    if (codeBlock && lang) {
      return 4 + ((lang.split('-')[1]).length ?? 0)
    }
    return 4
  }

  if (node.nodeName === 'CODE') {
    return 1
  }
  
  // check parents for nesting level? nested lists sometimes return -1
  if (node.nodeName === 'LI') {
    const isOrdered = findAncestorByType(node, 'OL')
    const isChecklist = Array.from(node.childNodes).find(x => x.nodeName === 'INPUT')
    const typeAdjustAmount = isChecklist ? 6 : isOrdered ? 3 : 2

    const ancestorCount = Math.max(0, findNumberOfListAncestors(node) - 1)
    const ancestorAdjustment = ancestorCount * typeAdjustAmount + (ancestorCount ? 2 : 0)

    return typeAdjustAmount + ancestorAdjustment
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

/**
 * Recursively get all text nodes
 * @param node 
 * @returns 
 */
const getAllTextNodesWithin = (node: Node) => {
  const textNodes: Node[] = []

  if (node.hasChildNodes()) {
    Array.from(node.childNodes).forEach(n => {
      const nodes = getAllTextNodesWithin(n)
      textNodes.push(...nodes)
    })
  } else if (node.nodeType === 3) {
    textNodes.push(node)
  }

  return textNodes
}

/**
 * This is just a sample function for testing. It could be implemented in the app so it is byte aware
 */
export const calculateClickPosition = (e: React.MouseEvent<HTMLElement>, isDoubleClick: boolean) => {
  let insertionLocation = 0 // todo: byte.length?
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return

  const selection = window.getSelection()
  if (!selection) return
  const focusNode = selection.focusNode

  const selectionStart = isDoubleClick ? selection.anchorOffset : selection.focusOffset

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
    let validAncestor = findAncestor(focusNode)
    if (validAncestor.parentNode?.nodeName === 'LI') {
      validAncestor = validAncestor.parentNode
    }
    
    const dataset = (validAncestor as HTMLElement).dataset
    if (!dataset) return [insertionLocation]

    if (dataset.originStart) {
      // debugger
      const adjustment = adjustByParentType(validAncestor)
      let textNodesWithinAncestor = getAllTextNodesWithin(validAncestor)

      if (validAncestor.nodeName === 'LI') {
        insertionLocation = parseInt(dataset.originStart) + selectionStart + adjustment
        return [insertionLocation]
      }

      const focusNodeIndexInChildren = textNodesWithinAncestor.indexOf(focusNode as ChildNode)
      if (focusNodeIndexInChildren < 0) {
        return [insertionLocation]
      }

      let prevChildrenLength = 0
      if (focusNodeIndexInChildren > 0) {
        const allLengths = textNodesWithinAncestor.slice(0, focusNodeIndexInChildren).map(x => x.textContent?.length).filter(x => !!x) as number[]
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
