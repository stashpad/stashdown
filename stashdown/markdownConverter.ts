import hljs from 'highlight.js';
import { marked, Renderer } from 'marked';
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
  highlight: function(code: string, lang: string, callback: ((error: any, code?: string | undefined) => void)) {
    if (lang) {
      return hljs.highlight(lang, code).value
    }
    return code
  }
});

const toHtml = (markdown: string): string => {
  const noTabs = markdown.replaceAll(/\t/, '    ')
  const chunks = generateChunks(noTabs);
  const tokens = generateTokens(noTabs, chunks);
  debugger
  // @ts-ignore
  const renderer = new Renderer({ includeOrigin: true })
  const html = marked.parser(tokens, { renderer });
  return html
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };
