

module.exports = {
    get: jest.fn(url => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
    }),
    post: jest.fn(url => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
        if (url === '/something2') {
            return Promise.resolve({
                data: 'data2'
            });
        }
    }),
    create: jest.fn(function () {
        return this;
    }),
    CancelToken: {
        source: function () {
            return {
                token: "test"
            };
        }
    },
    request: async data => {
        let headers = null;
        let file = null;
        if (data.params) {
            if (data.params.error) throw "BOOM";
        }

        if (data.headers) {
            headers = data.headers;
        }

        if (data.data) {
            file = data.data;
        }

        return Promise.resolve({
            data: {
                file: file,
                headers: headers,
                success: true,
                message: "The request was successful"
            }
        });
    }
};