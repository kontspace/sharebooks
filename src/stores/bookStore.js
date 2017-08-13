import { observable, action } from 'mobx';
import agent from '../agent';

class BookStore {

    @action listBooks() {
        return agent.Book.list().result;
    }
}

export default new BookStore();