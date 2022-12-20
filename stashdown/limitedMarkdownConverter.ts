import { marked, Renderer } from 'marked';
import { generateChunks } from './generateChunks';
import { generateTokens } from './generateTokens';

export interface IMarkdownConverter {
  toHtml(markdown: string): string;
}

/**
 * Disallows:
 *  - Headers
 *  - Blockquotes
 *  - UL items
 *  - Code blocks
 * 
 * @param markdown the raw markdown to render
 * @returns HTML with the above items escaped instead of rendered 
 */
const toHtml = (markdown: string): string => {
  const escaped = markdown
    .replaceAll(/^#/gm, '\\#')
    .replaceAll(/^>/gm, '\\>')
    .replaceAll(/^\*/gm, '\\*')
    .replaceAll(/^-/gm, '\\-')
    .replaceAll(/^\+/gm, '\\+')
    .replaceAll(/^```/gm, '\\`\\`\\`')
    .replaceAll(/^~~~/gm, '\\~\\~\\~')

  const chunks = generateChunks(escaped);
  const tokens = generateTokens(escaped, chunks);
  // @ts-ignore
  const renderer = new Renderer({ includeOrigin: true })
  const html = marked.parser(tokens, { renderer })
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201C\u201D]/g, '"');
  return html
};

const limitedConverter: IMarkdownConverter = {
  toHtml
};

export { limitedConverter };



