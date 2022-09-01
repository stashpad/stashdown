import { marked, Tokenizer } from 'marked';
import { renderLocations } from './renderLocations';

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}

marked.use({
  renderer: renderLocations
});

const toHtml = (markdown: string): string => {
  return marked.parse(markdown);
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };
