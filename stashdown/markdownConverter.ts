import hljs from 'highlight.js';
import { marked, Renderer } from 'marked';
import { generateChunks } from './generateChunks';
import { generateTokens } from './generateTokens';
import {emojiExtension} from "./emojiExtension";

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}

marked.use({
  gfm: true,
  breaks: true,
  smartLists: true,
  baseUrl: 'https://',
  extensions: [emojiExtension],
});

marked.setOptions({
  highlight: function(code: string, lang: string) {
    try {
      if (lang) {
        return hljs.highlight(code, { language: lang }).value
      }
      return code
    } catch (e) {
      console.error(e)
      // return code as is if there was an error
      return code
    }
  }
});

const toHtml = (markdown: string): string => {
  const noTabs = markdown.replaceAll(/\t/g, '    ')
  const chunks = generateChunks(noTabs);
  const tokens = generateTokens(noTabs, chunks);
  // @ts-ignore
  const renderer = new Renderer({ includeOrigin: true })
  const html = marked.parser(tokens, { renderer });
  return html
};

const noOrigintoHtml = (markdown: string): string => {
  const chunks = generateChunks(markdown);
  const tokens = generateTokens(markdown, chunks);
  // @ts-ignore
  const renderer = new Renderer({ includeOrigin: false })
  const html = marked.parser(tokens, { renderer }); // TODO: emojis work without this options object.
  return html
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };

const basicConverter: IMarkdownConverter = {
  toHtml: noOrigintoHtml
};

export { basicConverter };
