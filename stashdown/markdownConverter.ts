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
  baseUrl: 'https://'
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
