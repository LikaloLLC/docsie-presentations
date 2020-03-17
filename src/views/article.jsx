import Config from "./config";

import { Paragraph, Blockquote, Title, Header, Figure, List, Code, Code2, Dict, Gist, Video, Footer } from "./views/fragments";


export const articleEl = ({article}) => {
    console.log("inside article:::function", article);
    return  <div className="docsie-doc-plugin-bar">
              <header id="section-page-header" className="docsie-header">
                <div className="docsie-header-conatiner" role="presentation">
                  {
                    Config.app.articleIcon &&
                      article.icon ? <div className="docsie-header-icon" style={{ "background-image": `url(${article.icon})` }} /> : null
                  }
                  <h1 className="docsie-title">
                    {article.name}
                  </h1>
                  {
                    article.description &&
                    <p className="docsie-subtitle">{article.description}</p>
                  }
                  {
                    Config.app.articleMeta ? <div className="docsie-header-meta">
                      <span className="docsie-header-meta-version">{version.name}&nbsp;({version.number})</span>&nbsp;
              <span className="docsie-header-meta-date">{formatDate(article.lastUpdated)}</span>
                    </div> : null
                  }
                </div>
                <div className="docsie-header-plugin-bar" />
              </header>
              <div className="docsie-content">
                {article.sections.map((s, i) => <section className={`docsie-section docsie-section-${i}`} data-index={i} >
                  <div className="docsie-section-container" role="presentation">
                    {s.map(block => {
                      switch (block.type) {
                        case "header-two":
                          return <Title {...block} article={article.slug} section={Docsie.document.state.section} />;
                        case "header-three":
                          return <Header {...block} />;
                        case "figure":
                          return <Figure {...block} />;
                        case "video":
                          return <Video {...block} />;
                        case "list":
                          return <List {...block} />;
                        case "code-block":
                          if (article.doc.v === 2) return <Code2 {...block} />;
                          else return <Code {...block} />;
                        case "gist-block":
                          return <Gist {...block} />;
                        case "dictionary":
                          return <Dict {...block} />;
                        case "blockquote":
                          return <Blockquote {...block} />;
                        default:
                          return <Paragraph {...block} />;
                      }
                    })
                    }
                  </div>
                </section>)
                }
              </div>
              {/* <Footer articles={articles} article={article} /> */}
            </div>
}