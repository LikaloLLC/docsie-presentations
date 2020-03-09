import { getSrc, getSrcDoc, sizeIframe } from "presentation-utils";
const Fragment = ({
  id,
  data
}) => {
  const { src, label } = (data || {});
  return <figure id={id} className="docsie-videoblock">
    <div className="docsie-videoblock-content">
      {Boolean(src) ? <iframe frameborder={0}
        className="docsie-videoblock-content-frame"
        width="560" height="315"
        style={{ width: "100%", height: "100%" }}
        seamless="seamless"
        onLoad={sizeIframe}
        allow="fullscreen"
        allowfullscreen={true}
        src={getSrc(src)}
        srcdoc={getSrcDoc(src)}>
      </iframe> : <img src={Docsie.urls.placefalure} alt="No video" />}
    </div>
    {Boolean(label) ? <figcaption>{label}</figcaption> : null}
  </figure>;
}
export default Fragment;