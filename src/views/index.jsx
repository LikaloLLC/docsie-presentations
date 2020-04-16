import { Component } from "inferno";
import { autobind } from "decorators";

export class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            results: []
        };
    }
    render() {
        const {
            showResults, results
        } = this.state;
        return <aside className="docsie-search">
            <Form results={results && results.length} onReset={this.reset} onSearch={this.search} />
            <Search showResults={showResults} results={results} />
        </aside>;
    }
}