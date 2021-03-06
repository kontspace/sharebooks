import axios from "axios";

import "url-search-params-polyfill";

// polyfill
if (window.URLSearchParams) {
    window.URLSearchParams = URLSearchParams;
}


// function getBaseURL() {
//     let key = localStorage.getItem('CURRENT_MENU_KEY');
//     let baseURL = 'http://book.itzh.org/api/v1/'
//     switch(key) {
//         case 'onlinedoc':
//             baseURL = 'http://doc.itzh.org/api/v1/'
//         default:
//         baseURL = 'http://book.itzh.org/api/v1/'
//     }

//     return baseURL
// }



const request = axios.create({
    baseURL: 'http://book.itzh.org/api/v1/',
    // timeout: 10000
});

request.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
request.defaults.headers.put["Content-Type"] =
    "application/x-www-form-urlencoded";

const copyObj = obj => Object.assign({}, obj);

request.interceptors.request.use(
    config => {
        let formMethods = ["post", "put"];
        let _config = copyObj(config);

        if (_config.method.indexOf(formMethods) > -1) {
            if (_config.data) {
                let _data = copyObj(_config.data);
                _config.data = new URLSearchParams(_data);
            }
        }
        return _config;
    },
    error => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(response => {
    if (response.data.code != 0) {
        return Promise.reject(response.data.msg);
    }
    return response;
});

const Books = {
    list: (pageNum = 1, pageSize = 20, params={}) =>
        request.get("/book/get", {
            params: {
                bookId: -1,
                pageNum,
                pageSize,
                ...params
            }
        }),
    newTop: params =>
        request.get("/book/get", {
            params: {
                bookId: -1,
                dateSort: -1,
                ...params
            }
        }),
    increaseDownloadCount: bookId => 
        request.get('/book/download', {
            params: {
                bookId: bookId
            }
        }),
    get: id => 
        request.get('/book/get', {
            params: {
                bookId: id
            }
        })
    
};

const Category = {
    list: () => request.get("/category/get")
};

const Tags = {
    list: params => request.get('/tag/get', params=params)
}

const agent = {
    Books,
    Category,
    Tags
};

export default agent;
