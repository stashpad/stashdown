import { marked } from 'marked';
import Token = marked.Token;
import { useState } from 'react';

interface TokensViewProps {
  text: string;
  onClickToken: (token: Token) => void;
}

/**
 * https://github.com/markedjs/marked/issues/2134
 */
export const walkTokens = (token: any) => {
  let subs = token.tokens || token.items;
  if (subs) {
    let start = token.origin ? token.origin.start : 0;
    let subpos = 0;
    subs.forEach((sub: any) => {
      let substart = token.raw.indexOf(sub.raw, subpos);
      let sublen = sub.raw.length;
      sub.origin = {};
      sub.origin.start = substart + start;
      sub.origin.end = sub.origin.start + sublen;
      subpos = substart + sublen;
    });
  }
};

const TokensView = (props: TokensViewProps) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const tokens = marked.lexer(props.text);
  // @ts-ignore
  marked.walkTokens([{ tokens, raw: props.text }], walkTokens);
  return (
    <div className='flex flex-col space-y-2 p-2 overflow-y-auto'>
      {tokens.map((token, index) => {
        return (
          <TokenView
            key={index}
            token={token}
            selected={selected === index}
            onClickToken={() => {
              setSelected(index);
              props.onClickToken(token);
            }}
          />
        );
      })}
    </div>
  );
};

interface TokenViewProps {
  token: Token;
  selected: boolean;
  onClickToken: () => void;
}

const TokenView = (props: TokenViewProps) => {
  const text = JSON.stringify(props.token, null, 2);
  return (
    <div
      className={`p-2 whitespace-pre font-mono text-xs leading-[0.85rem] border ${
        props.selected ? 'border-indigo-500 border-2' : ''
      }`}
      onClick={props.onClickToken}
    >
      {text}
    </div>
  );
};

export { TokensView };
