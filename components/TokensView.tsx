import { marked } from 'marked';
import Token = marked.Token;
import { assignLocations } from '../stashdown/assignLocations';

interface TokensViewProps {
  text: string;
}

const TokensView = (props: TokensViewProps) => {
  const tokens = marked.lexer(props.text);
  assignLocations(tokens);
  return (
    <div className='flex flex-col space-y-2 p-2 overflow-y-auto'>
      {tokens.map((token, index) => {
        return <TokenView key={index} token={token} />;
      })}
    </div>
  );
};

interface TokenViewProps {
  token: Token;
}

const TokenView = (props: TokenViewProps) => {
  const text = JSON.stringify(props.token, null, 2);
  return (
    <div className='p-2 whitespace-pre font-mono text-xs leading-[0.85rem] border'>
      {text}
    </div>
  );
};

export { TokensView };
