import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://book.itzh.org/api/v1";

const responseBody = res => res.body;

const handleErrors = res => {
    if (res.status === 401) {
        authStore.logout();
    }
    return err;
};

const request = {
    get: url => superagent.get(`${API_ROOT}${url}`).end(responseBody)
};

const Book = {
    list: () => request.get('/book/get?bookId=-1')
}

export default {
    Book
}