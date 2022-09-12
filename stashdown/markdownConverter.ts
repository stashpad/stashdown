import hljs from 'highlight.js';
import { marked, Renderer } from '../../marked/lib/marked.cjs';
import { generateChunks } from './generateChunks';
import { generateTokens } from './generateTokens';

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}

marked.use({
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  baseUrl: 'https://',
});

marked.setOptions({
  highlight: function(code: string, lang: string, callback: Function) {
    if (lang) {
      return hljs.highlight(lang, code).value
    }
    // highlight auto?
    return code
  }
});

const toHtml = (markdown: string): string => {
  const chunks = generateChunks(markdown);
  const tokens = generateTokens(markdown, chunks);
  const html = marked.parser(tokens, { renderer: new Renderer({ includeOrigin: true })});
  return html
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };
