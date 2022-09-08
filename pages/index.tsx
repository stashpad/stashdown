import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useCodeMirror } from '../components/useCodeMirror';
import { Toolbar } from '../components/Toolbar';
import { Toggler } from '../components/Toggler';
import { TokensView } from '../components/TokensView';
import { HTMLView } from '../components/HTMLView';
import { RenderedView } from '../components/RenderedView';
import {
  highlightDecoration,
  highlightEffect,
  highlightExtension
} from '../components/highlightExtension';
import { kitchenSink } from '../stashdown/samples/kitchen-sink';

const Home: NextPage = () => {
  const [tab, setTab] = useState('tokens');
  const [text, setText] = useState(kitchenSink);

  const [ref, view] = useCodeMirror({
    initialText: kitchenSink,
    onChange: setText,
    extensions: [highlightExtension]
  });

  const onClickToken = (token: any) => {
    if (token.origin && view) {
      view.dispatch({
        effects: highlightEffect.of([
          highlightDecoration.range(token.origin.start, token.origin.end)
        ])
      });
    }
  };

  return (
    <div className='w-full h-full'>
      <div className='flex h-full divide-x divide-indigo-400'>
        <div className='w-1/2 flex flex-col'>
          <Toolbar title='Input' />
          <div className='flex-1 overflow-hidden' ref={ref} role={'textbox'} />
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
            {tab === 'tokens' && (
              <TokensView text={text} onClickToken={onClickToken} />
            )}
            {tab === 'html' && <HTMLView text={text} />}
            {tab === 'rendered' && <RenderedView text={text} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
