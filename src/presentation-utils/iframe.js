const urlRegexp = /^http/i;
const scriptRegexp = /<script/i;

export function getSrcDoc(txt) {
  if (scriptRegexp.test(txt)) return `<html><head><style>html,body{margin:0;padding:0}</style></head><body>${txt}</body></html>`;
  return undefined;
}

export function getSrc(txt) {
  if (urlRegexp.test(txt)) return txt;
  else return undefined;
}

export function sizeIframe(e) {
  try {
    const target = e.target;
    const document = target.contentWindow.document;
    target.style.height = document.documentElement.scrollHeight + "px";
    if (!document.classList.contains("sizemon")) {
      document.classList.add("sizemon");
      document.addEventListener("resize", sizeIframe);
    }
  } catch (err) {
    // Do nothing
  }
}