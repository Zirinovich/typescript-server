import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
let multiparty = require('connect-multiparty');

const Busboy = require('busboy');
const path = require('path');

const fs = require('fs');
const os = require('os');
var toArray = require('stream-to-array');


router.post('/main/content/addchangecontent', async(req, res) => {
    const requestData = req.body;
    let id = await contentLogic.addChangeFileAsync(requestData);
});

// router.post('/main/content/upload', multiparty({uploadDir: './build/upload'}));
router.post('/main/content/upload', async(req: any, res) => {
    const {files, fields} = await busboyEr(req);
    console.log(files[0].length);
    fs.readFile("./uploaded/1.t", "hex", (err, data) => {
        console.log(data.length);
    });
    if (req.files && req.files.link) {
        // TODO: вынести логику БД в database, вернуть данные на фронт, удалить файл из upload
        let id = await contentLogic.addChangeFileAsync(req.files.link);
        console.log(id);
    }
});

async function busboyEr(request, options = null): Promise<any> {
    options = options || {};
    options.headers = request.headers;
    const busboy = new Busboy(options);

    return new Promise((resolve, reject) => {
            const fields = {};
            const filePromises = [];

            request.on('close', cleanup);

            busboy
                .on('field', onField.bind(null, fields))
                .on('file', onFile.bind(null, filePromises))
                .on('close', cleanup)
                .on('error', onError)
                .on('end', onEnd)
                .on('finish', onEnd);

            busboy
                .on('partsLimit', function () {
                    const err = new Error('Reach parts limit');
                    (<any>err).code = 'Request_parts_limit';
                    (<any>err).status = 413;
                    onError(err);
                });
            busboy
                .on('filesLimit', () => {
                    const err = new Error('Reach files limit');
                    (<any>err).code = 'Request_files_limit';
                    (<any>err).status = 413;
                    onError(err);
                });

            request.pipe(busboy);
            function onError(err) {
                cleanup();
                return reject(err);
            }

            function onEnd(err) {
                cleanup();
                if (err) return reject(err);
                if (filePromises.length) {
                    Promise.all(filePromises)
                        .then(files => resolve({fields, files}))
                        .catch(reject);
                } else {
                    resolve({fields, files: []});
                }
            }

            function cleanup() {
                busboy.removeListener('field', onField);
                busboy.removeListener('file', onFile);
                busboy.removeListener('close', cleanup);
                busboy.removeListener('end', cleanup);
                busboy.removeListener('error', onEnd);
                busboy.removeListener('partsLimit', onEnd);
                busboy.removeListener('filesLimit', onEnd);
                busboy.removeListener('fieldsLimit', onEnd);
                busboy.removeListener('finish', onEnd);
            }
        }
    );
}


function onFile(filePromises, fieldname, file, filename, encoding, mimetype) {
    let filePromise = new Promise<any>(resolve => {
        const chunks = [];
        file.setEncoding("hex");

        file.on("data", (chunk) => {
            chunks.push(chunk);
        });
        file.on("end", () => {
            resolve(chunks.join());
        });
    });


    // const filePromise = toArray(file);
    filePromises.push(filePromise);
}


function onField(fields, name, val, fieldnameTruncated, valTruncated) {
    // don't overwrite prototypes
    if (Object.getOwnPropertyDescriptor(Object.prototype, name))
        return;

    // This looks like a stringified array, let's parse it
    if (name.indexOf('[') > -1) {
        const obj = objectFromBluePrint(extractFormData(name), val);
        reconcile(obj, fields);

    } else {
        if (fields.hasOwnProperty(name)) {
            if (Array.isArray(fields[name])) {
                fields[name].push(val);
            } else {
                fields[name] = [fields[name], val];
            }
        } else {
            fields[name] = val;
        }
    }
}

// Generate an object given an hierarchy blueprint and the value
// i.e. [key1, key2, key3] => { key1: {key2: { key3: value }}};
// @param  {Array} arr:   from extractFormData
// @param  {[type]} value: The actual value for this key
// @return {[type]}       [description]
const objectFromBluePrint = (arr, value) => {
    return arr
        .reverse()
        .reduce((acc, next) => {
            if (Number(next).toString() === 'NaN') {
                return {[next]: acc};
            } else {
                const newAcc = [];
                newAcc[Number(next)] = acc;
                return newAcc;
            }
        }, value);
};

// Extract a hierarchy array from a stringified formData single input.
// i.e. topLevel[sub1][sub2] => [topLevel, sub1, sub2]
// @param  {String} string: Stringify representation of a formData Object
// @return {Array}
const extractFormData = (string) => {
    const arr = string.split('[');
    const first = arr.shift();
    const res = arr.map(v => v.split(']')[0]);
    res.unshift(first);
    return res;
};

// Reconciles formatted data with already formatted data
// @param  {Object} obj extractedObject
// @param  {Object} target the field object
// @return {Object} reconciled fields
const reconcile = (obj, target) => {
    const key = Object.keys(obj)[0];
    const val = obj[key];

    // The reconciliation works even with array has
    // Object.keys will yield the array indexes
    // see https://jsbin.com/hulekomopo/1/
    // Since array are in form of [ , , valu3] [value1, value2]
    // the final array will be: [value1, value2, value3] has expected
    if (target.hasOwnProperty(key)) {
        return reconcile(val, target[key]);
    } else {
        return target[key] = val;
    }
};