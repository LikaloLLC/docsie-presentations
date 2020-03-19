import "./polyfills";
import { render } from "inferno";
import { autobind } from "decorators";
import * as Reveal from "reveal.js";
// import css1 from "./styles/reveal-css/reveal.scss";
// import css2 from "./styles/reveal-css/theme/white.scss";
import css3 from "./styles/presentation.scss";

import {config} from "./config";

import { Paragraph, Blockquote, Title, Header, Figure, List, Code, Code2, Dict, Gist, Video, Footer } from "./views/fragments";

import { LoadCss, unload_stylesheet } from "./presentation-utils/reveal-utils";

class main {
  $container = null;
  $btnContainer = null;
  articles = [];
  constructor () {
    // const listener = this.listener = new Listener(DdEvent.RENDER, this.onRender);
    // DispatcherService.add(listener);
    Docsie.document.onChange(this.onRender);
  }
  @autobind
  getMappedSectionData(sections, chunk_size) {
      var index = 0;
      var arrayLength = sections.length;
      var tempArray = [];
      
      for (index = 0; index < arrayLength; index += chunk_size) {
          let chunk = sections.slice(index, index+chunk_size);
          tempArray.push(chunk);
      }
  
      return tempArray;
  }
  @autobind
  onPresentMode(e) {
    // LoadCss related to reveal
    LoadCss(config.revealjs.css);
    LoadCss(config.revealjs.theme);
    e.stopPropagation();
    // hide html page
    document.getElementsByClassName("pure-docsie-container")[0].style.display = "none";
    // hide button
    document.getElementById("prs-btn").style.display = "none";
    // show reveal element
    document.getElementsByClassName("reveal")[0].style.display = "block";
    // show pages
    document.getElementsByClassName("slides")[0].style.display = "block";
    Reveal.default.initialize({
      width: "100%",
      height: "100%",
      margin: 0,
      minScale: 1,
      maxScale: 1,
      progress: false,
    });

    // create exit button and append to body
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "EXIT";
    btn.setAttribute("class", "exit-btn")
    document.body.appendChild(btn);

    // attach listener
    btn.addEventListener("click", () => {
      // hide pages
      document.getElementsByClassName("reveal")[0].style.display = "none";
      // hide exit button
      btn.style.display = "none";
      // show html content
      document.getElementsByClassName("pure-docsie-container")[0].style.display = "block";
      // show presentation button
      document.getElementById("prs-btn").style.display = "block";
      unload_stylesheet(document.getElementById("revealcss"));
    });
  }
  @autobind
  onRender(e) {

    const $el = Docsie.$el;

    this.articles = Docsie.document.state.articles;

    if ($el != undefined) {
      if (this.$container) {
        this.$container.remove();
        this.$btnContainer.remove();
        $el.prepend(this.$btnContainer);
        document.body.append(this.$container);
      } else {

        const container = document.createElement("div");
        container.className = "reveal";
        container.style.fontSize = "initial";
        document.body.append(this.$container = container);

        // create button and attach listener and prepend to DOCSIE__ROOT container
        let btn = document.createElement("BUTTON");
        btn.innerHTML = "Start Presentation";
        btn.setAttribute("id", "prs-btn");
        btn.setAttribute("class", "prs-btn");
        btn.addEventListener("click", (($event) => this.onPresentMode($event)));
        $el.prepend(this.$btnContainer = btn);

        // each slide should have 2 items from sections array
        // combine all sub array from sections array
        // create sub array such that it contains 4 items for slide view
        let sections = [];
        this.articles.forEach(article => {
          article.sections.forEach(section => {
            section.forEach(data => {
              sections.push(data); // push all sub array section data into sections array
            })
          });
          article.sections = this.getMappedSectionData(sections, 3);
          sections = [];
        });
        // create slides wrapped in section tag for presentation
        let presentation = this.articles.map((article, i) => {
          return <section class="scrollable">
            
            {/* <article className="docsie-doc" ref={(el) => this.$el = el}> */}
              {/* <articleEl article={article} /> */}
              {/* <div className="docsie-doc-plugin-bar"> */}
                <section>
                  <header id="section-page-header" className="docsie-header">
                  <div className="docsie-header-conatiner" role="presentation">
                    {/* TODO: HANLD EARTICLEICON DISPLAY */}
                    {/* {
                      Config.app.articleIcon &&
                        article.icon ? <div className="docsie-header-icon" style={{ "background-image": `url(${article.icon})` }} /> : null
                    } */}
                    <h1 className="docsie-title">
                      {article.name}
                    </h1>
                    {
                      article.description &&
                      <p className="docsie-subtitle">{article.description}</p>
                    }
                    {/* TODO: HANDLE ARTICLE META DATA */}
                    {/* {
                      Config.app.articleMeta ? <div className="docsie-header-meta">
                        <span className="docsie-header-meta-version">{version.name}&nbsp;({version.number})</span>&nbsp;
              <span className="docsie-header-meta-date">{formatDate(article.lastUpdated)}</span>
                      </div> : null
                    } */}
                  </div>
                  <div className="docsie-header-plugin-bar" />
                </header>
                </section>
                {/* <section>
                  <div className="docsie-content"> */}
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
                {/* </div> */}
                {/* </section> */}
                {/* <Footer articles={articles} article={article} /> */}
              {/* </div> */}
            {/* </article> */}
          </section>
        });

        render(
          <div class="slides" style={{ "display": "none" }}>
            {presentation}
          </div>,
          container
        );
      }
    }
  }
}

new main();
