export const Icon = ({
  width,
  height,
  type,
  values
}) => (<svg viewBox="0 0 20 20" width={width} height={height} className={`docsie-icon-${type}`}>
  {(() => {
    switch (type) {
      case "menu": return <path fill="none" stroke="currentColor"
        d={values.expanded ?
          "M16 16L4 4m12 0L4 16" :
          "M3 4.5h14m-14 5h14m-14 5h14"} />;
      case "link": return <path fill="none" stroke="currentColor" d="M10.6 12.4l-3 3c-.8.8-1.7.8-2.4 0l-.7-.6c-.7-.7-.7-1.6 0-2.3l3.1-3.1M9.3 7.4l3.1-3.1c.7-.7 1.6-.7 2.3 0l.7.7c.7.7.7 1.6 0 2.3l-3 3M8 11.9l4-4" />;
      case "searchtop": return <path fill="none" stroke="currentColor" d="M5 12l4-4 4 4M5 9l4-4 4 4m1 5l4 4zm2-5a7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7z" />;
      case "left": return <polyline fill="none" stroke="currentColor" points="13 16 7 10 13 4" />;
      case "right": return <polyline fill="none" stroke="currentColor" points="7 4 13 10 7 16" />;
      case "search": return <path fill="none" stroke="currentColor" d="M14 14l4 4zm2-5a7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7z" />;
      case "x": return <path fill="none" stroke="currentColor" d="M16 16L4 4M16 4L4 16" />;
    }
  })()}
</svg>);
Icon.defaultProps = {
  width: 20,
  height: 20
};
