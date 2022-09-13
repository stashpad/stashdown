import { Range, StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

const highlightEffect = StateEffect.define<Range<Decoration>[]>();

const highlightExtension = StateField.define({
  create() {
    return Decoration.none;
  },
  update(value, transaction) {
    value = value.map(transaction.changes);

    for (let effect of transaction.effects) {
      if (effect.is(highlightEffect)) {
        value = Decoration.none;
        value = value.update({ add: effect.value });
      }
    }

    return value;
  },
  provide(f) {
    return EditorView.decorations.from(f);
  }
});

const highlightDecoration = Decoration.mark({
  attributes: {
    class: 'highlighted'
  },
  inclusive: true
});

export { highlightEffect, highlightExtension, highlightDecoration };
