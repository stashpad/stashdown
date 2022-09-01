import { marked } from 'marked';

type Token = marked.Token & {
  origin?: {
    start: number;
    end: number;
  };
};

function assignLocations(tokens: marked.TokensList) {
  const parseToken = (token: Token, start: number) => {
    token.origin = {
      start: 0,
      end: 0
    };
  };
  tokens.forEach((token: Token) => {
    parseToken(token, 0);
  });
}

export { assignLocations };
