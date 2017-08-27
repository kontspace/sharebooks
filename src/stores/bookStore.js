import { observable, action, computed } from "mobx";
import agent from "../agent";

class BookStore {
    @observable isLoading = false;
    @observable bookRegistry = new Map();
    @observable bookCategories = new Map();
    @observable total = 0;
    @observable currentPage = 1;
    @observable newTopBookRegistry = new Map();
    @observable bookTags = [];
    @observable topDownload = new Map();
    @observable
    searchRegistry = {
        category: "all",
        option: "title",
        tags: [],
        title: ""
    };

    defaultPageSize = 10;

    @computed
    get _defaultPageSize() {
        return this.defaultPageSize;
    }

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
    get top10Download() {
        return this.topDownload.values();
    }

    @computed
    get currentKeySearchRegistry() {
        return this.searchRegistry.category;
    }

    @computed
    get searchRegistryOption() {
        return this.searchRegistry.option;
    }

    @computed
    get tags() {
        return this.bookTags;
    }

    @action
    getSearchRegistry() {
        return this.searchRegistry;
    }

    @action
    setSearchRegistry(k, v) {
        this.searchRegistry[k] = v;
    }

    @action
    loadTags(params = { count: 10 }) {
        return agent.Tags.list(params).then(
            action(res => {
                this.bookTags = res.data.result.map(item => item.name);
            })
        );
    }

    @action
    loadNewTop(params = {}) {
        return agent.Books.newTop({ pageSize: 10 }).then(
            action(res => {
                res.data.result.forEach(book => {
                    this.newTopBookRegistry.set(book._id, {
                        _id: book._id,
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
    loadBooks(pageNum = 1, PageSize = this.defaultPageSize, searchFields = {}) {
        this.isLoading = true;
        this.bookRegistry.clear();

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

    @action
    loadTopDownload = () => {
        return agent.Books
            .list(1, this.defaultPageSize, { downloadSort: -1 })
            .then(
                action(res => {
                    res.data.result.forEach(book => {
                        this.topDownload.set(book._id, {
                            _id: book._id,
                            title: book.name,
                            download: book.downloadLink
                        });
                    });
                })
            );
    };

    @action
    increaseDownloadCount(bookId) {
        return agent.Books.increaseDownloadCount(bookId);
    }
}

export default new BookStore();
