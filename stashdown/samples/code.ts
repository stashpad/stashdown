export const code = `\
\`\`\`js
const something = 'yo';

code
\`\`\`

\`\`\`go
package main
import "fmt"
func main() {
    fmt.Printf("Hello World")
}
\`\`\`
`;

export const complicatedFunction = `\
\`\`\`js
export const calculateAndSetClickPosition = (e: React.MouseEvent<HTMLElement>, isDoubleClick: boolean) => {
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
\`\`\`
`
