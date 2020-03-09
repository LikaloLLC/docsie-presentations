import { Link, Icon } from 'views/components'

const Fragment = ({
  id,
  text,
  article,
  section
}) => (
    <h2 id={id} className={`docsie-section-title ${id === section ? 'docsie-focus' : ''}`}>
      {text}
      {Docsie.config.sectionAnchor ?
        <Link className="docsie-section-anchor" title={text} article={article} section={id}>
          <Icon type="link" />
        </Link> : null}
    </h2>)
export default Fragment
