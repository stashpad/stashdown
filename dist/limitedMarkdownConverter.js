"use strict";
exports.__esModule = true;
exports.limitedConverter = void 0;
var marked_1 = require("marked");
var generateChunks_1 = require("./generateChunks");
var generateTokens_1 = require("./generateTokens");
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
var toHtml = function (markdown) {
    var escaped = markdown
        .replaceAll(/^#/gm, '\\#')
        .replaceAll(/^>/gm, '\\>')
        .replaceAll(/^\*/gm, '\\*')
        .replaceAll(/^-/gm, '\\-')
        .replaceAll(/^\+/gm, '\\+')
        .replaceAll(/^```/gm, '\\`\\`\\`')
        .replaceAll(/^~~~/gm, '\\~\\~\\~');
    var chunks = (0, generateChunks_1.generateChunks)(escaped);
    var tokens = (0, generateTokens_1.generateTokens)(escaped, chunks);
    // @ts-ignore
    var renderer = new marked_1.Renderer({ includeOrigin: true });
    var html = marked_1.marked.parser(tokens, { renderer: renderer });
    return html;
};
var limitedConverter = {
    toHtml: toHtml
};
exports.limitedConverter = limitedConverter;
