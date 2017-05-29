import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase, dbEngine} from "../../registration";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {UploadDto} from "../../../shared/ajaxDto/authentication/UploadDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import * as fs from "fs";
import * as path from "path";
import uuid = require("uuid");

export class ContentLogic implements IContentLogic {
    async addChangeContentAsync(file: UploadedFileDto): Promise<IDatabaseResult<UploadDto>> {
        return new Promise<IDatabaseResult<UploadDto>>(async resolve => {

            fs.readFile(file.path, 'hex', (err, data) => {
                data = '\\x' + data;

                let query = `INSERT INTO tupload (idupload, name, extension, size, type, dataupload, uploadcreated)
                                VALUES(@idupload
                                    ,@name
                                    ,@extension
                                    ,@size
                                    ,@type
                                    ,@dataupload
                                    ,now() AT TIME ZONE 'utc'
                                )
                                RETURNING *`;
                resolve(dbEngine.querySingleAsync<UploadDto>({
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