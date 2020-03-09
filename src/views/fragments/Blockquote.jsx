const Fragment = ({
    id,
    content
  }) => (<blockquote id={id} className="docsie-blockquote" dangerouslySetInnerHTML={{ __html: content }} />);
  export default Fragment;