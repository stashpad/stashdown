import { marked } from 'marked';
import { respectNewlinesInCodeAndPlainText } from './utils';

// TODO: use DOMPurify
marked.use({
  gfm: true,
  smartLists: true,
})

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}



const toHtml = (markdown: string): string => {
  return marked.parse(respectNewlinesInCodeAndPlainText(markdown));
};

const converter: IMarkdownConverter = {
  toHtml
};

export { converter };
