const Fragment = ({
  id,
  content
}) => (<p id={id} className="docsie-paragraph" dangerouslySetInnerHTML={{ __html: content }} />);
export default Fragment;