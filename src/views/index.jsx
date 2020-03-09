import { Component } from "inferno";
import { autobind } from "decorators";
import { SearchService } from "services";
import { Form } from "./Form";
import { Search } from "./Search";

export class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            results: []
        };
    }
    @autobind
    search() {
        const results = SearchService.search();
        results &&
        this.setState({
            showResults: results.length > 0,
            results
        });
    }
    @autobind
    reset() {
        SearchService.reset();
        this.setState({
            showResults: false,
            results: false
        });
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