import { marked } from 'marked';
import { assignLocations } from '../stashdown/assignLocations';

interface RenderedViewProps {
  text: string;
}

const RenderedView = (props: RenderedViewProps) => {
  const tokens = marked.lexer(props.text);
  assignLocations(tokens);
  const html = marked.parser(tokens);
  return (
    <div className='prose flex flex-col p-2 overflow-y-auto'>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export { RenderedView };
