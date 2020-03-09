import { Component } from "inferno";
import { autobind } from "decorators";
import { SearchService } from "services";
import { Icon } from "./Icon";

export const TIMEOUT = 500;

export class Form extends Component {
  timeout = null;
  constructor() {
    super(null);
    this.state = {
      expand: false
    };
  }
  @autobind
  onToggle(e) {
    e.stopPropagation();
    if (this.state.expand) {
      this.props.onReset();
    } else {
      e.preventDefault();
      setTimeout(this.autoFocus, 100);
    }
    this.setState({ expand: !this.state.expand });
  }
  @autobind
  autoFocus() {
    this.$V.dom.elements.namedItem("query").focus();
  }
  @autobind
  onSubmit(e) {
    e && e.preventDefault();
    clearTimeout(this.timeout);
    const query = this.$V.dom.elements.namedItem("query").value;
    SearchService.setQuery(query);
    this.props.onSearch();
  }
  @autobind
  onKeydown() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.onSubmit, TIMEOUT);
  }
  render() {
    const {
      results
    } = this.props;
    const {
      expand
    } = this.state;
    return <form className={expand ? "docsie-search-form expanded" : "docsie-search-form"} role="search" onSubmit={this.onSubmit}>
      <h3>
        <button className="docsie-search-button" type="submit" onClick={expand ? () => true : this.onToggle}><Icon type="search" width="24" height="24" /></button>
        <input name="query" type="search" onKeyDown={this.onKeydown} />
        {results ? <span className="docsie-search-count">&nbsp;({results})&nbsp;</span> : null}
        <button className="docsie-search-clear" type="reset" onClick={this.onToggle}>
          <Icon type="x" width="24" height="24" />
        </button>
      </h3>
    </form>;
  }
}
