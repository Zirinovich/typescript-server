import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase, dbEngine} from "../../registration";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import * as fs from "fs";
import * as path from "path";
import uuid = require("uuid");

export class ContentLogic implements IContentLogic {
    async addChangeFileAsync(file: UploadedFileDto): Promise<IDatabaseResult<FileDto>> {
        return new Promise<IDatabaseResult<FileDto>>(async resolve => {

            fs.readFile(file.path, 'hex', (err, data) => {
                data = '\\x' + data;

                let query = `INSERT INTO tfiles (idfile, filename, extension, tags, size, mimetype, filedata, filecreated)
                                VALUES(@idfile
                                    ,@filename
                                    ,@extension
                                    ,@tags
                                    ,@size
                                    ,@mimetype
                                    ,@filedata
                                    ,@filecreated)
                                RETURNING *`;
                resolve(dbEngine.querySingleAsync<FileDto>({
                    text: query, values: {
                        idupload: uuid.v4(),
                        name: file.originalFilename,
                        extension: path.extname(file.name),
                        size: file.size,
                        type: file.type,
                        dataupload: data
                    }
                }));
            });

            // let changeResult = await contentDatabase.updateContentAsync(content);
            // if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
            //     return resolve(Object.assign({}, {...changeResult}, {data: undefined}));
            // }
            //
            // let addResult = await contentDatabase.insertContentAsync(content);
            // resolve(Object.assign({}, {...addResult}, {data: undefined}));
        });
    }
}