"use strict";
exports.__esModule = true;
exports.generateChunks = void 0;
function generateChunks(text) {
    var lines = text.split('\n');
    var chunks = [];
    var current = [];
    var insideCodeBlock = false;
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];
        if (line.match(/^(```|~~~|    )/)) {
            insideCodeBlock = !insideCodeBlock;
        }
        if (line.length > 0 || insideCodeBlock) {
            current.push(line);
        }
        else {
            if (current.length > 0) {
                chunks.push(current.join('\n') + '\n');
                current = [];
            }
            chunks.push('\n');
        }
    }
    if (current.length)
        chunks.push(current.join('\n'));
    return chunks;
}
exports.generateChunks = generateChunks;
