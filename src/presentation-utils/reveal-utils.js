export function unload_stylesheet(DOMelement){
    DOMelement.disabled = true;
    DOMelement.parentNode.removeChild( DOMelement );
  }
  
export function LoadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute("id", "revealcss")
    document.getElementsByTagName("head")[0].appendChild(link);
}