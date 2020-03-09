import { getSrc, getSrcDoc, sizeIframe } from "presentation-utils";
const Fragment = ({
  id,
  data
}) => {
  const { src } = (data || {});
  return <figure id={id} className="docsie-frameblock">
    {Boolean(src) ? <iframe frameborder={0}
      className="docsie-frameblock-content-frame"
      style={{ minWidth: "100%", width: "100%", height: "340px" }}
      seamless="seamless"
      onLoad={sizeIframe}
      src={getSrc(src)}
      srcdoc={getSrcDoc(src)}>
    </iframe> : <img src={Docsie.urls.placefalure} alt="No data" />}
  </figure>;
}
export default Fragment;