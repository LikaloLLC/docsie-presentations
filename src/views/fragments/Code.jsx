const Fragment = ({
  data
}) => (<code className="docsie-codeblock">
  {data.map(({ id, content }) => <pre id={id} dangerouslySetInnerHTML={{ __html: content }} />)}
</code>);
export default Fragment;