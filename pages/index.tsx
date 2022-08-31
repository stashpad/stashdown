import type { NextPage } from 'next';
import React, { CSSProperties, useEffect, useState } from 'react';
import { converter } from '../stashdown/markdownConverter';

const Home: NextPage = () => {
  const [rendered, setRendered] = useState<string>('');

  const update = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;
    setRendered(converter.toHtml(text));
  };

  const resetCSS: CSSProperties = {
    all: 'unset'
  };

  useEffect(() => {
    setRendered(converter.toHtml(testString));
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='flex flex-row justify-around'>
        <div className='flex-1 mx-2'>
          <textarea
            onChange={update}
            className='border border-black w-full h-screen'
            defaultValue={testString}
          />
        </div>
        <div className='flex-1 mx-2'>
          <div
            style={resetCSS}
            dangerouslySetInnerHTML={{ __html: rendered }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const testString = `\
# Header
## Header
### Header
#### Header
##### Header
###### Header


Header
======

Header
---

some paragraph text

"quoted text"

'quoted text'

"quotes with 'sub quotes' inside"

'quotes with "sub quotes" inside'

**bold text**
__bold text__

*italics text*
_italics text_

*__bold and italics__*
_**bold and italics**_

~~strikethrough~~

> blockquote

> nested
>> blockquote

* an
* unordered
* list

- using
- dashes

+ using
+ plusses

* item
  * another item (2-5 spaces indented)
    * a third

1. one
2. two
   1. one (3 spaces required)
   2. two

* unordered
  1. with ordered

1. ordered
   * with unordered

this has a \`code span\` inside

\`\`\`
this is a code block
\`\`\`

~~~
this is a code block
~~~

    this is a code block (four indented spaces)

[link to google](www.google.com)

www.google.com

https://google.com
`;

export default Home;
