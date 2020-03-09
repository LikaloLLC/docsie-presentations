const STYLES = {
  "BOLD": ["<b>", "</b>"],
  "ITALIC": ["<i>", "</i>"],
  "CODE": ["<code>", "</code>"],
  "LINK": [({ href }) => `<a href="${href}">`, "</a>"],
  "MARK": ["<mark>", "</mark>"]
};

function difference(a, b) {
  let _a = new Set(a);
  let _b = new Set(b);
  return Array.from(new Set(
    [..._a].filter(x => !_b.has(x))));
}

function escapeHTML(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// https://github.com/evanc/backdraft-js
// values in haystack must be unique
function containsSome(haystack, needles) {
  return haystack.length > difference(haystack, needles).length;
}

function relevantStyles(offset, styleRanges) {
  return styleRanges
    .filter((range) => {
      return (offset >= range.offset && offset < (range.offset + range.length));
    });
}

export function convertBlock(block, markup = STYLES) {
  const text = escapeHTML(block.text || "");
  const ranges = block.inlineStyleRanges;
  let outputText = [];
  let styleStack = [];

  if (ranges.length > 0) {
    // Renderer optimization
    const minOffset = Math.min(...ranges.map(r => r.offset));
    const maxOffset = Math.min(text.length, Math.max(...ranges.map(r => r.offset + r.length)) + 1);
    outputText.push(text.substr(0, minOffset));
    // loop over every char in this block's text
    for (var i = minOffset; i < maxOffset; i++) {

      // figure out what styles this char and the next char need
      // (regardless of whether there *is* a next char or not)
      var characterStyles = relevantStyles(i, ranges);
      var nextCharacterStyles = relevantStyles(i + 1, ranges);

      // calculate styles to add and remove
      var stylesToAdd = difference(characterStyles, styleStack);
      var stylesToRemove = difference(characterStyles, nextCharacterStyles);

      // add styles we will need for this char
      stylesToAdd.forEach(s => {
        var { style, type, data } = s;
        styleStack.push(s);
        markup[style] &&
          outputText.push(markup[style][0]);
        markup[type] &&
          outputText.push(markup[type][0](data));
      });

      outputText.push(text.substr(i, 1));

      // remove styles we won't need anymore
      while (containsSome(styleStack, stylesToRemove)) {
        var toRemove = styleStack.pop();
        var { style, type } = toRemove;
        markup[style] &&
          outputText.push(markup[style][1]);
        markup[type] &&
          outputText.push(markup[type][1]);
      }
    }
    outputText.push(text.substr(maxOffset));
  } else outputText = text;

  return Array.isArray(outputText) ? outputText.join("") : outputText;
}

export function buildMarkup(rawDraftContentState, markup = STYLES) {
  const blocks = rawDraftContentState.blocks;
  return blocks.map(b => convertBlock(b, markup));
}