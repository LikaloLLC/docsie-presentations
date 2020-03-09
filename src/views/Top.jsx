import { Component } from "inferno";
import { autobind } from "decorators";
import { DOM } from "utils";
import { DdEvent } from "models";
import { DispatcherService, Listener } from "services";
import { Icon } from "./Icon";

export class BackToTop extends Component {
    constructor(props) {
        super(props);
        this.listener = new Listener(DdEvent.VIEWPORTCHANGE, this.onUpdate);
        this.state = {
            isVisible: false
        };
    }
    componentDidMount() {
        DispatcherService.add(this.listener);
        const searchContainer = DOM.element(".docsie-search-results", DOM.root);
        if(searchContainer.length) {
            const {top, height} = searchContainer.pop().getBoundingClientRect();
            this.offsetTop = top + height;
        }
    }
    @autobind
    onUpdate(e) {
        const { top } = e.detail;
        this.setState({ isVisible: top > this.offsetTop });
    }
    @autobind
    onClick(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
    render() {
        const { count } = this.props;
        const { isVisible } = this.state;
        return isVisible ? <button onClick={this.onClick} className="docsie-back-to-search-results">
            <Icon type="searchtop" />&nbsp;({count})
      </button> : null;
    }
    componentWillUnmount() {
        DispatcherService.remove(this.listener);
    }
}