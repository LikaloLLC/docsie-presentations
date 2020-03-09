const Fragment = ({
  data
}) => (<dl className="docsie-dictionary-block">
  {data.map(({ id, content }, i) => ((i % 2) ? 
  <dd key={id} id={id} dangerouslySetInnerHTML={{ __html: content }} /> :
  <dt key={id} id={id} dangerouslySetInnerHTML={{ __html: content }} />))}
</dl>);
export default Fragment;