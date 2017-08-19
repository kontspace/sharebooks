import { observable, action, computed } from "mobx";
import agent from "../agent";

class BookStore {
    @observable isLoading = false;
    @observable bookRegistry = new Map();
    @observable bookCategories = new Map();
    @observable total = 0;
    @observable currentPage = 1;
    defaultPageSize = 10;

    @computed
    get books() {
        return this.bookRegistry.values();
    }

    @computed
    get categories() {
        return this.bookCategories.values();
    } 

    // @computed
    // get tags(category) {
    //     return this.bookCategories.get(categoryId);
    // }

    @action
    loadCategories() {
        return agent.Category.list()
            .then(action(res => {
                console.log(res)
                res.data.result.forEach(category => {
                    this.bookCategories.set(category._id, category.name)
                })
            }))
    }

    @action
    loadBooks(pageNum = 1, PageSize = this.defaultPageSize) {
        this.isLoading = true;
        this.bookRegistry.clear();
        return agent.Books.list(pageNum, PageSize).then(
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
