import { autobind } from "decorators";
import { DdEvent, SearchResultModel } from "models";
import { DispatcherService, Listener } from "services";
import { DOM } from "utils";

const MIN_SEARCH_LENGTH = 3;

class SearchService {
    constructor() {
        // const listener = this.listener = new Listener(DdEvent.INDEX, this.onUpdate);
        // this.index = null;
        // this.reset();
        // DispatcherService.add(listener);
        Docsie.document.onChange(this.onUpdate);
    }
    @autobind
    onUpdate(e) {
        this.index = e.index || [];
    }
    setIndex(index) {
        this.index = index;
    }
    setQuery(query) {
        this.query = query;
    }
    search(query = this.query) {
        const { index } = this;
        if (this.index === null || query.length < MIN_SEARCH_LENGTH) return false;
        this.setQuery(query);
        let results = [];
        if (Boolean(query.trim()))
            index.forEach(block => {
                let r;
                if (r = block.contains(query))
                    results.push(new SearchResultModel(r, block.url));
            });
        return this.results = results
            .sort((a, b) => (b.relevance - a.relevance))
            .filter(r => r.relevance > 1);
    }
    reset() {
        this.query = "";
        this.results = [];
    }
}

export default new SearchService();