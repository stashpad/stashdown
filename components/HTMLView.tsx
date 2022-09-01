import { marked } from 'marked';
import { assignLocations } from '../stashdown/assignLocations';

interface HTMLViewProps {
  text: string;
}

const HTMLView = (props: HTMLViewProps) => {
  const tokens = marked.lexer(props.text);
  assignLocations(tokens);
  const html = marked.parser(tokens);
  return (
    <div className='flex flex-col p-2 overflow-y-auto whitespace-pre font-mono text-xs leading-[0.85rem]'>
      {html}
    </div>
  );
};

export { HTMLView };
