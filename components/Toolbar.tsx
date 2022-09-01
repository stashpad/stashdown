import { ReactNode } from 'react';

interface ToolbarProps {
  title: string;
  children?: ReactNode;
}

const Toolbar = (props: ToolbarProps) => {
  return (
    <div className='h-12 flex justify-between items-center border-b-2 p-2 border-indigo-500'>
      <div className='text-2xl font-bold text-indigo-500'>{props.title}</div>
      <div>{props.children}</div>
    </div>
  );
};

export { Toolbar };
