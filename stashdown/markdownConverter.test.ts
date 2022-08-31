import { describe, it } from "vitest";
import { expect } from "expect";
import { converter } from "./markdownConverter";

describe('headers', () => {
  it('renders h1', () => {
    const header = '# h1 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h1 id="h1-heading">h1 Heading</h1>\n')
  })
  it('renders h2', () => {
    const header = '## h2 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h2 id="h2-heading">h2 Heading</h2>\n')
  })
  it('renders h3', () => {
    const header = '### h3 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h3 id="h3-heading">h3 Heading</h3>\n')
  })
  it('renders h4', () => {
    const header = '#### h4 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h4 id="h4-heading">h4 Heading</h4>\n')
  })
  it('renders h5', () => {
    const header = '##### h5 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h5 id="h5-heading">h5 Heading</h5>\n')
  })
  it('renders h6', () => {
    const header = '###### h6 Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<h6 id="h6-heading">h6 Heading</h6>\n')
  })
  it('renders paragraph if # is not followed by space', () => {
    const header = '#Heading'
    const result = converter.toHtml(header)
    expect(result).toBe('<p>#Heading</p>\n')
  })
})

// /* eslint-disable jest/no-disabled-tests */
// import { converter } from '../renderer/utils/markdown/markdown'
//
// describe('markdownConverter', () => {
//   describe('toHtml', () => {

//
//     it('renders horizontal rule', () => {
//       const input = '---'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<hr />')
//     })
//
//     it('renders quotes', () => {
//       const input = '"Smartypants, double quotes" and \'single quotes\''
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p>"Smartypants, double quotes" and \'single quotes\'</p>')
//     })
//
//     it('renders bold', () => {
//       const input = '**This is bold text**'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p><strong>This is bold text</strong></p>')
//     })
//
//     it('renders bold underline', () => {
//       const input = '__This is bold text__'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p><strong>This is bold text</strong></p>')
//     })
//
//     it('renders italics', () => {
//       const input = '*This is italic text*'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p><em>This is italic text</em></p>')
//     })
//
//     it('renders italics underline', () => {
//       const input = '_This is italic text_'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p><em>This is italic text</em></p>')
//     })
//
//     it('renders strikethrough', () => {
//       const input = '~~Strikethrough~~'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p><del>Strikethrough</del></p>')
//     })
//
//     it('renders blockquote', () => {
//       const input = '> Blockquotes can also be nested...'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<blockquote>\n  <p>Blockquotes can also be nested…</p>\n</blockquote>')
//     })
//
//     it('renders nested blockquote', () => {
//       const input = '>> ...by using additional greater-than signs right next to each other...'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<blockquote>\n  <blockquote>\n    <p>…by using additional greater-than signs right next to each other…</p>\n  </blockquote>\n</blockquote>'
//       )
//     })
//
//     it('renders unordered list', () => {
//       const input = '+ Create a list by starting a line with `+`, `-`, or `*`'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<ul>\n<li>Create a list by starting a line with <code>+</code>, <code>-</code>, or <code>*</code></li>\n</ul>'
//       )
//     })
//
//     it.skip('renders unordered sub list', () => {
//       const input = '+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:'
//       const result = converter.toHtml(input)
//       expect(result).toBe('')
//     })
//
//     it('renders ordered list', () => {
//       const input = '1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<ol>\n<li>Lorem ipsum dolor sit amet</li>\n<li>Consectetur adipiscing elit</li>\n</ol>')
//     })
//
//     it('renders ordered list with number offset', () => {
//       const input = '57. foo\n1. bar'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<ol start="57">\n<li>foo</li>\n<li>bar</li>\n</ol>')
//     })
//
//     it('renders code span', () => {
//       const input = 'Inline `code`'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<p>Inline <code>code</code></p>')
//     })
//
//     it.skip('renders indented code block', () => {
//       const input = 'Indented code\n\n\t// Some comments\n\tline 1 of code\n\tline 2 of code\n\tline 3 of code'
//       const result = converter.toHtml(input)
//       expect(result).toBe('')
//     })
//
//     it('renders fenced code block', () => {
//       const input = '```\nSample text here...\n```'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<pre><code class="hljs">Sample text here...\n</code></pre>')
//     })
//
//     it('renders fenced tilde code block', () => {
//       const input = '~~~\nSample text here...\n~~~'
//       const result = converter.toHtml(input)
//       expect(result).toBe('<pre><code class="hljs">Sample text here...\n</code></pre>')
//     })
//
//     it('renders a link', () => {
//       const input = '[link text](http://dev.nodeca.com)'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<p><a href="http://dev.nodeca.com" rel="noopener noreferrer" target="_blank">link text</a></p>'
//       )
//     })
//
//     it('renders a link auto converted', () => {
//       const input = 'Autoconverted link https://github.com/nodeca/pica'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="https://github.com/nodeca/pica" rel="noopener noreferrer" target="_blank">https://github.com/nodeca/pica</a></p>'
//       )
//     })
//
//     it('renders a bare link auto converted', () => {
//       const input = 'Autoconverted link www.google.com'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">www.google.com</a></p>'
//       )
//     })
//
//     it.skip('renders a bare link with no subdomain auto converted', () => {
//       const input = 'Autoconverted link google.com'
//       const result = converter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="http://google.com" rel="noopener noreferrer" target="_blank">google.com</a></p>'
//       )
//     })
//   })
//   describe('regression tests', () => {
//     // https://linear.app/stashpad/issue/BYT-804/markdown-header-not-rendered-properly-when-following-new-line
//     it('BYT-804 Markdown header renders correctly after only a new line', () => {
//       const headerAfterNewLine = '\n# A header'
//       const result = converter.toHtml(headerAfterNewLine)
//       expect(result).toBe('<h1 id="aheader">A header</h1>')
//     })
//     it('BYT-804 Markdown header renders correctly after other markdown items and a new line', () => {
//       const headerAfterNewLine = '\n# A header\n\nyo\n\n# another'
//       const result = converter.toHtml(headerAfterNewLine)
//       expect(result).toBe('<h1 id="aheader">A header</h1>\n<p>&nbsp;\nyo\n&nbsp;</p>\n<h1 id="another">another</h1>')
//     })
//   })
//   describe('toMarkdown', () => {
//     it('renders header', () => {
//       const header = '<h1>A header</h1>'
//       const result = converter.toMarkdown(header)
//       expect(result).toBe('# A header\n')
//     })
//   })
// })