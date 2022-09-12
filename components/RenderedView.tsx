import React from 'react';
import { marked } from '../../marked/lib/marked.cjs';
import { converter } from '../stashdown/markdownConverter';
import { calculateAndSetClickPosition } from '../stashdown/utils';

interface RenderedViewProps {
  text: string;
  setCursorLocation: React.Dispatch<React.SetStateAction<number[]>>
}

const RenderedView = (props: RenderedViewProps) => {
  const html = converter.toHtml(props.text)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const insert = calculateAndSetClickPosition(e, false)
    console.log(insert)
    if (insert?.length) props.setCursorLocation(insert)
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    const insert = calculateAndSetClickPosition(e, true)
    console.log(insert)
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
