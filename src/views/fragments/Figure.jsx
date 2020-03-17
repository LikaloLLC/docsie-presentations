import {config} from "../../config";
const MediaTypes = { NULL: 0, IMAGE: 1, EMBED: 2, VIDEO: 3 };
function getMediaType(src) {
  switch (true) {
    case !Boolean(src):
      return MediaTypes.NULL;
    case src.indexOf("youtube.com") > 0:
    case src.indexOf("dailymotion.com") > 0:
    case src.indexOf("vimeo.com") > 0:
      return MediaTypes.EMBED;
    default:
      return MediaTypes.IMAGE;
  }
}
const None = () => <img src={config.urls.placeholder} alt="No image" />
const Youtube = ({
  width,
  height,
  src,
  label
}) => <iframe
    width={width || "560"}
    height={height || "315"}
    src={src}
    aria-label={label}
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen={true} />;
const Image = ({
  width,
  height,
  src,
  label
}) => <picture><img
  width={width || "auto"}
  height={height || "auto"}
  src={src}
  onError={(e) => e.target.src = config.urls.placefalure}
  alt={label || ""} /></picture>;
const Fragment = ({
  id,
  data
}) => {
  try {
    return (<figure id={id} className="docsie-figure">
      {
        (() => {
          switch (getMediaType(data.src)) {
            case MediaTypes.NULL: return <None />;
            case MediaTypes.EMBED: return <Youtube {...data} />
            case MediaTypes.IMAGE:
            default: return <Image {...data} />
          }
        })()
      }
      {
        Boolean(data && data.label) ?
          <figcaption>{data.label}</figcaption> : null
      }
    </figure>);
  } catch (e) {
    return null;
  }
}
export default Fragment;
