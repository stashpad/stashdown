import React from 'react';
import { converter } from '../stashdown/markdownConverter';
import { calculateClickPosition } from '../stashdown/utils';

interface RenderedViewProps {
  text: string;
  setCursorLocation: React.Dispatch<React.SetStateAction<number[]>>
}

const RenderedView = (props: RenderedViewProps) => {
  const html = converter.toHtml(props.text)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const insert = calculateClickPosition(e, false)
    if (insert?.length) props.setCursorLocation(insert)
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    const insert = calculateClickPosition(e, true)
    if (insert?.length) props.setCursorLocation(insert)
  }

  return (
    <div className='prose flex flex-col p-2 overflow-y-auto'>
      <div 
        onClick={handleClick} 
        onDoubleClick={handleDoubleClick}  
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
};

export { RenderedView };
