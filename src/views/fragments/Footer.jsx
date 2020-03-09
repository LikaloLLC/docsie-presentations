import { Link, Icon } from "views/components";

const Fragment = ({
  articles,
  article
}) => {
  let previous, next
  if (articles && article) {
    const index = articles.findIndex(a => a.id === article.id)
    previous = index > 0 ? articles[index - 1] : null
    next = index < articles.length ? articles[index + 1] : null
  }
  return <footer className="docsie-footer">
    <div className="docsie-footer-plugin-bar" />
    {Docsie.config.footer ? <nav className="docsie-footer-nav">
      <div className="docsie-footer-previous">
        {
          previous && [
            Boolean(Docsie.config.msgFooterPrevious) ?
              <span className="docsie-footer-previous-label">{Docsie.config.msgFooterPrevious}</span> :
              null,
            <Link article={previous.slug}>{previous.name}</Link>
          ]
        }
      </div>
      <div className="docsie-footer-next">
        {
          next && [
            Boolean(Docsie.config.msgFooterNext) ?
              <span className="docsie-footer-next-label">{Docsie.config.msgFooterNext}</span> :
              null,
            <Link article={next.slug}>{next.name}</Link>
          ]
        }
      </div>
    </nav> : null}
    <p className="docsie-madewith">
      <small>Made with <a href="https://docsie.io">Docsie.io</a></small>
    </p>
  </footer>
}
export default Fragment
