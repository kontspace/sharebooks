import { observable, action, computed } from "mobx";
import agent from "../agent";

class BookStore {
    @observable isLoading = false;
    @observable bookRegistry = new Map();
    @observable bookCategories = new Map();
    @observable total = 0;
    @observable currentPage = 1;
    @observable newTopBookRegistry = new Map();
    @observable
    searchRegistry = {
        category: "all"
    };
    defaultPageSize = 10;

    @computed
    get books() {
        return this.bookRegistry.values();
    }

    @computed
    get categories() {
        return this.bookCategories.values();
    }

    @computed
    get newTop() {
        return this.newTopBookRegistry.values();
    }

    @computed
    get currentKeySearchRegistry() {
        return this.searchRegistry.category;
    }

    @action
    setSearchRegistry(k, v) {
        this.searchRegistry[k] = v;
    }

    @action
    loadNewTop(params = {}) {
        return agent.Books.newTop({ pageSize: 10 }).then(
            action(res => {
                res.data.result.forEach(book => {
                    this.newTopBookRegistry.set(book._id, {
                        title: book.name,
                        download: book.downloadLink
                    });
                });
            })
        );
    }

    @action
    loadCategories() {
        return agent.Category.list().then(
            action(res => {
                res.data.result.forEach(category => {
                    this.bookCategories.set(category._id, category.name);
                });
            })
        );
    }

    @action
    loadBooks(pageNum = 1, PageSize = this.defaultPageSize) {
        this.isLoading = true;
        this.bookRegistry.clear();

        let searchFields = {}
        if (this.searchRegistry.category != 'all') {
            searchFields.category = this.searchRegistry.category;
        } else {
            delete searchFields.category;
        }

        return agent.Books.list(pageNum, PageSize, searchFields).then(
            action(res => {
                this.isLoading = false;
                this.total = res.data.total;

                res.data.result.forEach(book => {
                    this.bookRegistry.set(book._id, {
                        _id: book._id,
                        title: book.name,
                        cover: book.bookImgSrc,
                        tags: book.tag,
                        desc: book.describe,
                        score: parseFloat((book.score / 20).toFixed(1)), // 100 -> 5
                        category: book.category,
                        download: book.downloadLink
                    });
                });

                this.currentPage = pageNum;
            })
        );
    }
}

export default new BookStore();
