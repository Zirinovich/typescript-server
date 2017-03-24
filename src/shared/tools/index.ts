export function getMD5base64(sourceString: string) {
    const hash = require('md5-base64')
    return hash(sourceString);
}