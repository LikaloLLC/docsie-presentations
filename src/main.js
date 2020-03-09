import CSS from "styles/search.scss";
import "./polyfills";
import { render } from "inferno";
import { autobind } from "decorators";
import { DdEvent } from "models";
import { DispatcherService, Listener } from "services";
import { DOM } from "utils";
import Config from "./config";

import { View } from "./views";

import { Paragraph, Blockquote, Title, Header, Figure, List, Code, Code2, Dict, Gist, Video, Footer } from "./views/fragments";

import * as Reveal from "reveal.js";
import css1 from "./styles/reveal-css/reveal.scss";
import css2 from "./styles/reveal-css/theme/white.scss";
import css3 from "./styles/presentation.scss";

class main {
  $container = null;
  articles = [];
  constructor () {
    // const listener = this.listener = new Listener(DdEvent.RENDER, this.onRender);
    // DispatcherService.add(listener);
    console.log("Docsie Window Object", Docsie);
    console.log("about to hide DOCSIE__ROOT el");
    document.getElementsByClassName("pure-docsie-container")[0].style.display = "none";
    Docsie.document.onChange(this.onRender);
  }
  @autobind
  onPresentMode(e) {
    e.stopPropagation();
    console.log("inside onPresentMode: onClick, Reveal::", Reveal);
    console.log("Reveal is ready, about to initialize", Reveal);
    document.getElementById("prs-btn").style.display = "none";
    Reveal.default.initialize({
      width: "100%",
      height: "100%",
      margin: 0,
      minScale: 1,
      maxScale: 1,
      progress: false,
    });
    // document.getElementsByClassName("reveal")[0].style.display = "block";
    // Reveal.default.addEventListener( 'ready', function( event ) {
    //   // event.currentSlide, event.indexh, event.indexv
    //   console.log("Reveal is ready, about to initialize", Reveal);
    //   Reveal.default.initialize();
    // } );
  }
  @autobind
  onRender(e) {

    const $el = Docsie.$el;

    this.articles = Docsie.document.state.articles;

    if ($el != undefined) {
      if (this.$container) {
        this.$container.remove();
        // $el.append(this.$container);
        document.body.append(this.$container);
      } else {
        const container = document.createElement("div");
        container.className = "reveal";
        container.style.fontSize = "initial";
        container.style.overflow = "auto";
        // $el.append(this.$container = container);
        document.body.append(this.$container = container);
        // render(
        //   <View />,
        //   container
        // );
        console.log("this.articles", this.articles);
        let presentation = this.articles.map(article => {
          return <section class="scrollable">
          <article className="docsie-doc" ref={(el) => this.$el = el}>
            {/* <Toggler /> */}
            {Config.app.presentationMode && <span onClick={() => present()}>Enter Presentation Mode</span>}
            <div className="docsie-doc-plugin-bar" />
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
          </article>
          </section>
        });

        render(
          // <span>
          //   {presentation}
          // </span>,
          // <div>
            // <span onClick={($event) => this.onPresentMode($event)}>
            //   click me to go to presenation mode
            // </span>
            // <div class="reveal" style="display: none;">
            // wrking example
            // onClick={($event) => this.onPresentMode($event)}
            <div>
              <button class="prs-btn" id="prs-btn" onClick={($event) => this.onPresentMode($event)}>
                Click To Start Presentation.
              </button>
              <div class="slides">
                {/* <section>Slide 1</section>
                <section>Slide 2</section> */}
                {presentation}
              </div>
            </div>,
             //working example,
          //   {/* </div>
          // </div>, */}
          container
        );
      }
    }
  }
}

new main();
