"use strict";
exports.__esModule = true;
exports.generateTokens = void 0;
var marked_1 = require("marked");
function generateTokens(text, chunks) {
    var lexer = marked_1.marked.lexer;
    var tokens = [];
    chunks.forEach(function (chunk) {
        if (chunk === '\n') {
            tokens.push({
                type: 'paragraph',
                raw: '\n',
                text: '\n',
                tokens: []
            });
        }
        else {
            tokens.push.apply(tokens, lexer(chunk));
        }
    });
    // @ts-ignore
    marked_1.marked.walkTokens([{ tokens: tokens, raw: text }], assignOrigin);
    return tokens;
}
exports.generateTokens = generateTokens;
/**
 * https://github.com/markedjs/marked/issues/2134
 */
function assignOrigin(token) {
    // @ts-ignore
    var subs = token.tokens || token.items;
    if (subs) {
        var start_1 = token.origin ? token.origin.start : 0;
        var subpos_1 = 0;
        subs.forEach(function (sub) {
            var substart = token.raw.indexOf(sub.raw, subpos_1);
            if (substart === -1) {
                // whitespace insensitive compare for nested lists
                var tokenNoSpaces = token.raw.replaceAll(/\s/g, '');
                var subNoSpaces = sub.raw.replaceAll(/\s/g, '');
                substart = tokenNoSpaces.indexOf(subNoSpaces, 0);
            }
            var sublen = sub.raw.length;
            sub.origin = {
                start: substart + start_1,
                end: substart + start_1 + sublen
            };
            subpos_1 = substart + sublen;
        });
    }
}
