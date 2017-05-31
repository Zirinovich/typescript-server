import {Request} from "express-serve-static-core";
import {UploadedFileDto} from "../../../_interfaces/engine/dto/UploadedFileDto";
const Busboy = require('busboy');
import * as path from "path";

export class MultipartFormParser {

    async ParseForm(req: Request, options = null): Promise<{fields: any,uploadedFiles: UploadedFileDto[]}> {
        options = options || {};
        options.headers = req.headers;
        const busboy = new Busboy(options);

        return new Promise<{fields: any,uploadedFiles: UploadedFileDto[]}>((resolve, reject) => {
                const fields = {};
                const uploadPromises: Promise<UploadedFileDto>[] = [];

                req.on('close', cleanup);

                busboy
                    .on('field', MultipartFormParser.onField.bind(null, fields))
                    .on('file', MultipartFormParser.onFile.bind(null, uploadPromises))
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

                req.pipe(busboy);
                function onError(err) {
                    cleanup();
                    return reject(err);
                }

                function onEnd(err) {
                    cleanup();
                    if (err) return reject(err);
                    if (uploadPromises.length) {
                        Promise.all(uploadPromises)
                            .then(files => resolve({fields, uploadedFiles: files}))
                            .catch(reject);
                    } else {
                        resolve({fields, uploadedFiles: []});
                    }
                }

                function cleanup() {
                    busboy.removeListener('field', MultipartFormParser.onField);
                    busboy.removeListener('file', MultipartFormParser.onFile);
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

    private static onFile(filePromises, fieldname, file, filename, encoding, mimetype) {
        let uploadPromise = new Promise<UploadedFileDto>(resolve => {
            const chunks: string[] = [];
            file.setEncoding("hex");

            file.on("data", (chunk) => {
                chunks.push(chunk);
            });
            file.on("end", () => {
                let data = "\\x".concat(...chunks);
                resolve({
                    fieldName: fieldname,
                    fileName: filename,
                    size: data.length / 2 - 1,
                    mimeType: mimetype,
                    hexData: data,
                    encoding: encoding,
                    extension: path.extname(filename).substring(1).toLowerCase()
                });
            });
        });

        filePromises.push(uploadPromise);
    };


    private static onField(fields, name, val, fieldnameTruncated, valTruncated) {
        // don't overwrite prototypes
        if (Object.getOwnPropertyDescriptor(Object.prototype, name))
            return;

        // This looks like a stringified array, let's parse it
        if (name.indexOf('[') > -1) {
            const obj = MultipartFormParser.objectFromBluePrint(MultipartFormParser.extractFormData(name), val);
            MultipartFormParser.reconcile(obj, fields);

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
    };

    // Generate an object given an hierarchy blueprint and the value
    // i.e. [key1, key2, key3] => { key1: {key2: { key3: value }}};
    // @param  {Array} arr:   from extractFormData
    // @param  {[type]} value: The actual value for this key
    // @return {[type]}       [description]
    private static objectFromBluePrint(arr, value) {
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
    private static extractFormData(string) {
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
    private static reconcile(obj, target) {
        const key = Object.keys(obj)[0];
        const val = obj[key];

        // The reconciliation works even with array has
        // Object.keys will yield the array indexes
        // see https://jsbin.com/hulekomopo/1/
        // Since array are in form of [ , , valu3] [value1, value2]
        // the final array will be: [value1, value2, value3] has expected
        if (target.hasOwnProperty(key)) {
            return MultipartFormParser.reconcile(val, target[key]);
        } else {
            return target[key] = val;
        }
    };
}