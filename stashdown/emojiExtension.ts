import data from '@emoji-mart/data'
import {marked} from "marked";
import RendererThis = marked.RendererThis;

interface EmojiToken {
  type: string;
  raw: string;
  id?: string;
  char?: string;
}

// @ts-ignore
const emojiDict = data.emojis
const emojiNames = Object.keys(emojiDict).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const emojiRegex = new RegExp(`:(${emojiNames}):`);
const tokenizerRule = new RegExp(`^${emojiRegex.source}`);

export const emojiExtension: marked.TokenizerExtension & marked.RendererExtension  = {
  name: 'emoji',
  level: 'inline',
  start: (src: string) => {
    return src.match(emojiRegex)?.index;
  },
  tokenizer: (src: string): EmojiToken | undefined => {
    const match = tokenizerRule.exec(src);
    if (!match) return

    const name = match[1];
    const emojiData = emojiDict[name];

    return {
      type: 'emoji',
      raw: match[0],
      id: emojiData.id,
      char: emojiData.skins[0].native,
    };
  },
  renderer(this: RendererThis, token: EmojiToken) {
    return `<emoji>${token.char as string}</emoji>`
  }
}
