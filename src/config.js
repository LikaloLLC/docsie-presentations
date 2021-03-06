export default {
  app: {
    name: "search"
  },
  dom: {
    element: ".docsie-doc"
  }
};

export const config = {
  urls: {
    placeholder: "DOCSIE_LIB_REPLACE/assets/placeholder.png",
    placefalure: "DOCSIE_LIB_REPLACE/assets/error.png"
  },
  revealjs: {
    // css: "https://revealjs.com/css/reveal.css",
    // theme: "https://revealjs.com/css/theme/white.css"
    css: "https://s3.amazonaws.com/lib.docsie.io/css/reveal_css/reveal.css",
    theme: "https://s3.amazonaws.com/lib.docsie.io/css/reveal_css/theme/white.css"
  }
}