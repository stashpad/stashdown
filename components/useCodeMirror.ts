import { useCallback, useState } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';

interface CodeMirrorProps {
  initialText?: string;
  extensions?: Extension[];
  onChange?: (text: string) => void;
}

export const useCodeMirror = (
  props?: CodeMirrorProps
): [(node: HTMLDivElement | null) => void, EditorView | null] => {
  const [state] = useState<EditorState>(() => {
    const extensions = props?.extensions ? props.extensions : [];
    if (props?.onChange) extensions.push(changeExtension(props.onChange));
    return EditorState.create({
      doc: props?.initialText,
      extensions: [...extensions, theme]
    });
  });
  const [view, setView] = useState<EditorView | null>(null);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (view) {
        view.destroy();
      }
      if (node !== null) {
        setView(
          new EditorView({
            parent: node,
            state
          })
        );
      }
    },
    [state]
  );

  return [ref, view];
};

const changeExtension = (onChange: (text: string) => void) => {
  return EditorView.updateListener.of((view: ViewUpdate) => {
    if (view.docChanged) {
      const doc = view.state.doc;
      const value = doc.toString();
      onChange(value);
    }
  });
};

const theme = EditorView.theme({
  '&': {
    height: '100%'
  },
  '&.cm-focused': {
    outline: 'none !important'
  },
  '.cm-content': {
    padding: '4px 2px'
  },
  '.highlighted': {
    background: '#6366f1',
    color: 'white'
  }
});
