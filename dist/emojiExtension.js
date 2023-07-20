"use strict";
exports.__esModule = true;
exports.emojiExtension = void 0;
var data = require("@emoji-mart/data");
// @ts-ignore
var emojiDict = data.emojis;
var emojiNames = Object.keys(emojiDict).map(function (e) { return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
var emojiRegex = new RegExp(":(".concat(emojiNames, "):"));
var tokenizerRule = new RegExp("^".concat(emojiRegex.source));
exports.emojiExtension = {
    name: 'emoji',
    level: 'inline',
    start: function (src) {
        var _a;
        return (_a = src.match(emojiRegex)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer: function (src) {
        var match = tokenizerRule.exec(src);
        if (!match)
            return;
        var name = match[1];
        var emojiData = emojiDict[name];
        return {
            type: 'emoji',
            raw: match[0],
            id: emojiData.id,
            char: emojiData.skins[0].native
        };
    },
    renderer: function (token) {
        return "<emoji>".concat(token.char, "</emoji>");
    }
};
