function generateChunks(text: string): string[] {
    const lines = text.split('\n');
    const chunks: string[] = [];
  
    let current: string[] = [];
    let insideCodeBlock = false
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line.match(/^(```|~~~)/)) {
        insideCodeBlock = !insideCodeBlock
      }

      if (line.length > 0 || insideCodeBlock) {
        current.push(line);
      } else {
        if (current.length > 0) {
          chunks.push(current.join('\n') + '\n');
          current = [];
        }
        chunks.push('\n');
      }
    }

    if (current.length) chunks.push(current.join('\n'));
  
    return chunks;
  }
  
  export { generateChunks };