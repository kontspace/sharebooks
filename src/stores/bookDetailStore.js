import { observable, action, computed } from "mobx";
import agent from "../agent";


class BookDetailStore {
    @observable abook = {}

    @computed
    get currentBook() {
        return this.abook;
    }


    @action loadBook(id) {
        return agent.Books.get(id).then(
            action(res => {
                this.abook = Object.assign({}, res.data.result)
            })

        )
    }
}
export default new BookDetailStore()

