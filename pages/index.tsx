import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useCodeMirror } from '../components/useCodeMirror';
import { Toolbar } from '../components/Toolbar';
import { Toggler } from '../components/Toggler';
import { TokensView } from '../components/TokensView';
import { HTMLView } from '../components/HTMLView';
import { RenderedView } from '../components/RenderedView';

const Home: NextPage = () => {
  const [tab, setTab] = useState('rendered');
  const [text, setText] = useState('');

  const [ref] = useCodeMirror({
    onChange: setText
  });

  return (
    <div className='w-full h-full'>
      <div className='flex h-full divide-x divide-indigo-400'>
        <div className='w-1/2 flex flex-col'>
          <Toolbar title='Input' />
          <div className='flex-1 p-2' ref={ref} role={'textbox'} />
        </div>
        <div className='w-1/2 flex flex-col'>
          <Toolbar title='Output'>
            <Toggler
              current={tab}
              options={['tokens', 'html', 'rendered']}
              onChange={(option) => setTab(option)}
            />
          </Toolbar>
          <div className='flex flex-col overflow-hidden'>
            {tab === 'tokens' && <TokensView text={text} />}
            {tab === 'html' && <HTMLView text={text} />}
            {tab === 'rendered' && <RenderedView text={text} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
