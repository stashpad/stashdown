import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
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
import { paragraphs } from '../stashdown/samples/paragraphs';
import { code, complicatedFunction } from '../stashdown/samples/code';
import { headers0 } from '../stashdown/samples/headers';
import { lists } from '../stashdown/samples/lists';
import { links } from '../stashdown/samples/links';
import {emojis} from "../stashdown/samples/emojis";

const samples = [
  { name: 'Kitchen Sink', value: kitchenSink },
  { name: 'Paragraphs', value: paragraphs },
  { name: 'Code', value: code },
  { name: 'Links', value: links },
  { name: 'Code Function', value: complicatedFunction },
  { name: 'Headers', value: headers0 },
  { name: 'Lists', value: lists },
  { name: 'Emojis', value: emojis },
]

const Home: NextPage = () => {
  const [tab, setTab] = useState('tokens');
  const [text, setText] = useState(links);
  const [cursorLocation, setCursorLocation] = useState<number[]>([])

  const [ref, view] = useCodeMirror({
    initialText: text,
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

  useEffect(() => {
    const onCursorChange = (insert: number[]) => {
      if (view) {
        view.dispatch({
          effects: highlightEffect.of([
            highlightDecoration.range(insert[0], insert[1] ?? insert[0] + 1)
          ])
        });
      }
    };
    if (cursorLocation.length) {
      onCursorChange(cursorLocation)
    }
  }, [cursorLocation, view])

  const onSampleClick = (sample: typeof samples[0]) => {
    if (view)
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: sample.value,
      },
    })
  }

  return (
    <div className='w-full h-full'>
      <div className='flex h-full divide-x divide-indigo-400'>
        <div className='w-1/8 flex flex-col'>
          <Toolbar title='Samples' />
          {
            samples.map(s => {
              return <div key={s.name} onClick={() => {
                setText(s.value)
                onSampleClick(s)
              }}>{s.name}</div>
            })
          }
        </div>
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
            {tab === 'rendered' && <RenderedView text={text} setCursorLocation={setCursorLocation} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
