"use strict";
exports.__esModule = true;
exports.basicConverter = exports.converter = void 0;
var highlight_js_1 = require("highlight.js");
var marked_1 = require("marked");
var generateChunks_1 = require("./generateChunks");
var generateTokens_1 = require("./generateTokens");
marked_1.marked.use({
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    baseUrl: 'https://'
});
marked_1.marked.setOptions({
    highlight: function (code, lang) {
        try {
            if (lang) {
                return highlight_js_1["default"].highlight(code, { language: lang }).value;
            }
            return code;
        }
        catch (e) {
            console.error(e);
            // return code as is if there was an error
            return code;
        }
    }
});
var toHtml = function (markdown) {
    var noTabs = markdown.replaceAll(/\t/g, '    ');
    var chunks = (0, generateChunks_1.generateChunks)(noTabs);
    var tokens = (0, generateTokens_1.generateTokens)(noTabs, chunks);
    // @ts-ignore
    var renderer = new marked_1.Renderer({ includeOrigin: true });
    var html = marked_1.marked.parser(tokens, { renderer: renderer })
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');
    return html;
};
var noOrigintoHtml = function (markdown) {
    var chunks = (0, generateChunks_1.generateChunks)(markdown);
    var tokens = (0, generateTokens_1.generateTokens)(markdown, chunks);
    // @ts-ignore
    var renderer = new marked_1.Renderer({ includeOrigin: false });
    var html = marked_1.marked.parser(tokens, { renderer: renderer })
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');
    return html;
};
var converter = {
    toHtml: toHtml
};
exports.converter = converter;
var basicConverter = {
    toHtml: noOrigintoHtml
};
exports.basicConverter = basicConverter;
