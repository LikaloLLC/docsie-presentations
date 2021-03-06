import { Component } from "inferno";
import { autobind } from "decorators";
import { DdEvent } from "models";
import { DispatcherService, Listener } from "services";
// import { DocumentStore } from "store";
import { Route } from "utils";

export default class Link extends Component {
  static displayName = "Link";
  static propTypes = {
    className: "",
    title: "",
    article: "",
    section: "",
    onClick: null
  };
  static defaultProps = {
    title: "",
    className: "",
    onClick: () => {}
  };
  constructor() {
    super();
    this.state = {
      isActive: false,
      href: "#"
    };
    this.inViewListener = new Listener(DdEvent.SECTION_IN_VIEW, this.onScrollIntoView);
  }
  componentWillMount() {
    // this.unsubscribe = DocumentStore(this.onChange);
  }
  componentDidMount() {
    DispatcherService.add(this.inViewListener);
  }
  @autobind
  onChange({ version, language }) {
    const {
      article,
      section
    } = this.props;
    const href = Route.Link({
      version,
      language,
      article,
      section
    });
    this.setState({
      isActive: href === Route.href,
      href
    });
  }
  @autobind
  onScrollIntoView(e) {
    debugger;
  }
  @autobind
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    Route.Go(e.currentTarget.href);
    this.props.onClick(e.target.href);
  }
  render() {
    const {
      title,
      className,
      children
    } = this.props;
    const {
      href,
      isActive
    } = this.state;
    return <a
      onClick={this.onClick}
      title={title}
      className={`${className} ${isActive ? "pure-link-active" : ""}`}
      href={href}>{children}</a>;
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
}
