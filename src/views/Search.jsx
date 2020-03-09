import { Component } from "inferno";
import { autobind } from "decorators";
import { Route } from "utils";
import { Icon } from "./Icon";
import { BackToTop } from "./Top";

export class Search extends Component {
  @autobind
  onClick(e, result) {
    e.preventDefault();
    e.stopPropagation();
    Route.Go(result.url);
  }
  render() {
    const {
      showResults,
      results,
    } = this.props;
    return showResults ? <div className="docsie-search-results" role="list">
      {
        results.map((result, i) => <p className="docsie-search-result" role="listitem">
          {i + 1}.&nbsp;
            <span dangerouslySetInnerHTML={{ __html: result.sample }} /><br />
          <a href={result.url} onClick={(e) => this.onClick(e, result)}><Icon type="link" />&nbsp;<small>{result.url}</small></a>
        </p>)
      }
      {/* <BackToTop count={results.length} /> */}
    </div> : null;
  }
}
