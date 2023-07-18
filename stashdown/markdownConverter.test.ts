import { describe, it } from "vitest";
import { expect } from "expect";
import { basicConverter, converter } from "./markdownConverter";

describe('headers', () => {
  it('renders h1', () => {
    const header = '# h1 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h1 data-hash-header=false id="h1-heading"><span>h1 Heading</span></h1>\n')
  })
  it('renders h2', () => {
    const header = '## h2 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h2 data-hash-header=false id="h2-heading"><span>h2 Heading</span></h2>\n')
  })
  it('renders h3', () => {
    const header = '### h3 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h3 data-hash-header=false id="h3-heading"><span>h3 Heading</span></h3>\n')
  })
  it('renders h4', () => {
    const header = '#### h4 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h4 data-hash-header=false id="h4-heading"><span>h4 Heading</span></h4>\n')
  })
  it('renders h5', () => {
    const header = '##### h5 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h5 data-hash-header=false id="h5-heading"><span>h5 Heading</span></h5>\n')
  })
  it('renders h6', () => {
    const header = '###### h6 Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<h6 data-hash-header=false id="h6-heading"><span>h6 Heading</span></h6>\n')
  })
  it('renders paragraph if # is not followed by space', () => {
    const header = '#Heading'
    const result = basicConverter.toHtml(header)
    expect(result).toBe('<p><span>#Heading</span></p>\n')
  })
})

describe('spacing', () => {
  it('one line renders a single paragraph', () => {
    const para = 'this is a single paragraph'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>this is a single paragraph</span></p>\n')
  })

  it('one new line renders a single paragraph with a line break', () => {
    const para = 'this is a\nsingle paragraph'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>this is a</span><br><span>single paragraph</span></p>\n')
  })

  it('two new lines inserts a p with an &nbsp; in it\'s own paragraph inside it', () => {
    const para = 'this is two\n\nseparate paragraphs'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>this is two</span></p>\n<p></p>\n<p><span>separate paragraphs</span></p>\n')
  })

  it('respects single newlines inside a code block', () => {
    const para = '```\ncode\nmore code\n```'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<pre><code>code\nmore code\n</code></pre>\n')
  })

  it('respects many newlines inside a code block', () => {
    const para = '```\ncode\n\n\n\nmore code\n```'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<pre><code>code\n\n\n\nmore code\n</code></pre>\n')
  })
})

describe('quotes', () => {
  it('does not convert to smart quotes', () => {
    const para = '"here we go"'
    const result = basicConverter.toHtml(para)
    // Example of disallowed conversion output
    // <p><span>“here we go”</span></p>
    expect(result).toBe('<p><span>&quot;here we go&quot;</span></p>\n')
  })

  it('does not convert to single smart quotes', () => {
    const para = '\'here we go\''
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>&#39;here we go&#39;</span></p>\n')
  })

  it('returns smart quotes if specified by user', () => {
    const para = '“here we go”'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>“here we go”</span></p>\n')
  })

  it('returns single smart quotes if specified by user', () => {
    const para = '‘here we go’'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>‘here we go’</span></p>\n')
  })
})

describe('emojis', () => {
  it('renders an emoji', () => {
    const para = 'cool :sunglasses:'
    const result = basicConverter.toHtml(para)
    expect(result).toBe('<p><span>cool </span><emoji>😎</emoji></p>\n')
  })

})

// /* eslint-disable jest/no-disabled-tests */
// import { basicConverter } from '../renderer/utils/markdown/markdown'
//
// describe('markdownbasicConverter', () => {
//   describe('toHtml', () => {

//
//     it('renders horizontal rule', () => {
//       const input = '---'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<hr />')
//     })
//
//     it('renders quotes', () => {
//       const input = '"Smartypants, double quotes" and \'single quotes\''
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p>"Smartypants, double quotes" and \'single quotes\'</p>')
//     })
//
//     it('renders bold', () => {
//       const input = '**This is bold text**'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p><strong>This is bold text</strong></p>')
//     })
//
//     it('renders bold underline', () => {
//       const input = '__This is bold text__'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p><strong>This is bold text</strong></p>')
//     })
//
//     it('renders italics', () => {
//       const input = '*This is italic text*'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p><em>This is italic text</em></p>')
//     })
//
//     it('renders italics underline', () => {
//       const input = '_This is italic text_'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p><em>This is italic text</em></p>')
//     })
//
//     it('renders strikethrough', () => {
//       const input = '~~Strikethrough~~'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p><del>Strikethrough</del></p>')
//     })
//
//     it('renders blockquote', () => {
//       const input = '> Blockquotes can also be nested...'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<blockquote>\n  <p>Blockquotes can also be nested…</p>\n</blockquote>')
//     })
//
//     it('renders nested blockquote', () => {
//       const input = '>> ...by using additional greater-than signs right next to each other...'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<blockquote>\n  <blockquote>\n    <p>…by using additional greater-than signs right next to each other…</p>\n  </blockquote>\n</blockquote>'
//       )
//     })
//
//     it('renders unordered list', () => {
//       const input = '+ Create a list by starting a line with `+`, `-`, or `*`'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<ul>\n<li>Create a list by starting a line with <code>+</code>, <code>-</code>, or <code>*</code></li>\n</ul>'
//       )
//     })
//
//     it.skip('renders unordered sub list', () => {
//       const input = '+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('')
//     })
//
//     it('renders ordered list', () => {
//       const input = '1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<ol>\n<li>Lorem ipsum dolor sit amet</li>\n<li>Consectetur adipiscing elit</li>\n</ol>')
//     })
//
//     it('renders ordered list with number offset', () => {
//       const input = '57. foo\n1. bar'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<ol start="57">\n<li>foo</li>\n<li>bar</li>\n</ol>')
//     })
//
//     it('renders code span', () => {
//       const input = 'Inline `code`'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<p>Inline <code>code</code></p>')
//     })
//
//     it.skip('renders indented code block', () => {
//       const input = 'Indented code\n\n\t// Some comments\n\tline 1 of code\n\tline 2 of code\n\tline 3 of code'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('')
//     })
//
//     it('renders fenced code block', () => {
//       const input = '```\nSample text here...\n```'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<pre><code class="hljs">Sample text here...\n</code></pre>')
//     })
//
//     it('renders fenced tilde code block', () => {
//       const input = '~~~\nSample text here...\n~~~'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe('<pre><code class="hljs">Sample text here...\n</code></pre>')
//     })
//
//     it('renders a link', () => {
//       const input = '[link text](http://dev.nodeca.com)'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<p><a href="http://dev.nodeca.com" rel="noopener noreferrer" target="_blank">link text</a></p>'
//       )
//     })
//
//     it('renders a link auto converted', () => {
//       const input = 'Autoconverted link https://github.com/nodeca/pica'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="https://github.com/nodeca/pica" rel="noopener noreferrer" target="_blank">https://github.com/nodeca/pica</a></p>'
//       )
//     })
//
//     it('renders a bare link auto converted', () => {
//       const input = 'Autoconverted link www.google.com'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">www.google.com</a></p>'
//       )
//     })
//
//     it.skip('renders a bare link with no subdomain auto converted', () => {
//       const input = 'Autoconverted link google.com'
//       const result = basicConverter.toHtml(input)
//       expect(result).toBe(
//         '<p>Autoconverted link <a href="http://google.com" rel="noopener noreferrer" target="_blank">google.com</a></p>'
//       )
//     })
//   })
//   describe('regression tests', () => {
//     // https://linear.app/stashpad/issue/BYT-804/markdown-header-not-rendered-properly-when-following-new-line
//     it('BYT-804 Markdown header renders correctly after only a new line', () => {
//       const headerAfterNewLine = '\n# A header'
//       const result = basicConverter.toHtml(headerAfterNewLine)
//       expect(result).toBe('<h1 id="aheader">A header</h1>')
//     })
//     it('BYT-804 Markdown header renders correctly after other markdown items and a new line', () => {
//       const headerAfterNewLine = '\n# A header\n\nyo\n\n# another'
//       const result = basicConverter.toHtml(headerAfterNewLine)
//       expect(result).toBe('<h1 id="aheader">A header</h1>\n<p>&nbsp;\nyo\n&nbsp;</p>\n<h1 id="another">another</h1>')
//     })
//   })
//   describe('toMarkdown', () => {
//     it('renders header', () => {
//       const header = '<h1>A header</h1>'
//       const result = basicConverter.toMarkdown(header)
//       expect(result).toBe('# A header\n')
//     })
//   })
// })