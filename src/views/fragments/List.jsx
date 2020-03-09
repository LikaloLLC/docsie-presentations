const Wrapper = ({
  type,
  children
}) => ((type === "unordered") ?
  <ul className="docsie-list">{children}</ul> :
  <ol className="docsie-list">{children}</ol>);

const Fragment = ({
  data,
  style
}) => (<Wrapper type={style}>
  {data.map(({ id, items, content }) =>
    Array.isArray(items) &&
      items.length > 0 ? <li key={id} id={id}>
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <Fragment data={items} style={style} />
      </li> :
      <li key={id} id={id} dangerouslySetInnerHTML={{ __html: content }} />)}
</Wrapper>);
export default Fragment;