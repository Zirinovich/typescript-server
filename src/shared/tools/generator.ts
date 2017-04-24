let id = 0;
let idPrefix = 'ui-id-';

class Generator {
    genId() {
        let oldId = id;
        id += 1;
        return idPrefix + oldId;
    }

    getMD5base64(string: string) {
        const hash = require('md5-base64')
        return hash(string);
    }
}

const generator = new Generator();

export {generator};