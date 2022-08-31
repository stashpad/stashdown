import { marked } from 'marked';

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}

const toHtml = (markdown: string): string => {
  return marked.parse(markdown);
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };
