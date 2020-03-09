const Fragment = ({
  id, content, data
}) => {
  const { type, label } = (data || {});
  return <div id={id} className="docsie-codeblock-container">
    {
      label || type ? <h4 className="docsie-codeblock-label">
        <span>{label}</span>
        <span className="docsie-codeblock-type">{type}</span>
      </h4> : null
    }
    <code className={`docsie-codeblock language-${type}`} data-language={type}>
      <pre dangerouslySetInnerHTML={{ __html: content }} />
    </code>
  </div>;
}
export default Fragment;