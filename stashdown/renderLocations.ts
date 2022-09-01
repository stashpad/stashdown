import { Renderer, Slugger } from 'marked';

const renderLocations = {
  heading(
    this: Renderer,
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: Slugger
  ): string {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>\n`;
    }

    // ignore IDs
    return `<h${level}>${text}</h${level}>\n`;
  }
};

export { renderLocations };
