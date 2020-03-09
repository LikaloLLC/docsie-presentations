/**
 * Formate URI, replacing the specified fragments with values from the params object
 * @export
 * @param {string} str the URL string, containing replacable fragments in format {fragment}
 * @param {Object} params optional object containing the fragment values
 * @returns 
 */
export function formatUri(str, params) {
  var regex = /\{(\w+)\}/g,
    uri = str,
    from,
    to,
    m;
  if (params)
    while ((m = regex.exec(str)) !== null) {
      from = m[0];
      to = params[m[1]];
      if (to !== undefined)
        uri = uri.replace(from, to);
    }
  return uri;
}

// export function slugify(text) {
//   return text.toString().toLowerCase()
//     .replace(/\s+/g, "-")           // Replace spaces with -
//     .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
//     .replace(/\-\-+/g, "-")         // Replace multiple - with single -
//     .replace(/^-+/, "")             // Trim - from start of text
//     .replace(/-+$/, "");            // Trim - from end of text
// }