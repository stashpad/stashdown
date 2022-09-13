import { converter } from '../stashdown/markdownConverter';

interface HTMLViewProps {
  text: string;
}

const HTMLView = (props: HTMLViewProps) => {
  const html = converter.toHtml(props.text)
  return (
    <div className='flex flex-col p-2 overflow-y-auto whitespace-pre font-mono text-xs leading-[0.85rem]'>
      {html}
    </div>
  );
};

export { HTMLView };
