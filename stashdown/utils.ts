const isListItem = (line: string): boolean => {
  const orderedRegex = /^(\s*)(\d+\.\s+)(.*)/;
  const unorderedRegex = /^(\s*)([-*])(.*)/;
  return orderedRegex.test(line) || unorderedRegex.test(line);
};

export const respectNewlinesInCodeAndPlainText = (text: string) => {
  // console.log('text before', text)
  const result = text.replace(/(\n{2,})/g, (_, p1, offset) => {
    const substringBefore = text.substring(0, offset);
    const tripleBackTicksExist = substringBefore.match(/```|~~~/g);

    // check if we need to also include a newline
    const prevLines = substringBefore.split(/\n/);
    const lastLine = prevLines.pop();
    const additionalWhitespace = lastLine && isListItem(lastLine) ? '\n' : '';

    // check if we're in a code block
    const hasOddNumberOfTripleBackTicksBefore =
      tripleBackTicksExist && tripleBackTicksExist.length % 2 === 1;
    // respect plain whitespace if in a code block, add NBSP if in plain text
    const whitespace = hasOddNumberOfTripleBackTicksBefore
      ? ' '
      : '\u00A0\n' + additionalWhitespace;
    return Array(p1.length).fill('\n').join(whitespace);
  });
  // console.log('text after', result)
  return result;
};
