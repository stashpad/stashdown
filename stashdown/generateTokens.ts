import { marked } from '../../marked/lib/marked.cjs';
import Token = marked.Token;

type LocatedToken = Token & {
  origin?: {
    start: number;
    end: number;
  };
};

function generateTokens(text: string, chunks: string[]) {
  const lexer = marked.lexer;
  const tokens: Token[] = [];
  chunks.forEach((chunk) => {
    if (chunk === '\n') {
      tokens.push({
        type: 'paragraph',
        raw: '\n',
        text: '\n',
        tokens: []
      });
    } else {
      tokens.push(...lexer(chunk));
    }
  });
  // @ts-ignore
  marked.walkTokens([{ tokens, raw: text }], assignOrigin);
  return tokens;
}

/**
 * https://github.com/markedjs/marked/issues/2134
 */
function assignOrigin(token: LocatedToken) {
  // @ts-ignore
  let subs: Token[] | undefined = token.tokens || token.items;
  if (subs) {
    let start = token.origin ? token.origin.start : 0;
    let subpos = 0;
    subs.forEach((sub: LocatedToken) => {
      let substart = token.raw.indexOf(sub.raw, subpos);
      let sublen = sub.raw.length;
      sub.origin = {
        start: substart + start,
        end: substart + start + sublen
      };
      subpos = substart + sublen;
    });
  }
}

export { generateTokens };