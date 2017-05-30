import {IContentDatabase} from "../../_interfaces/main/IContentDatabase";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadDto} from "../../_interfaces/engine/dto/UploadDto";
import {dbEngine} from "../../registration";

import uuid = require("uuid");

export class ContentDatabase implements IContentDatabase{

    insertFileAsync(upload: UploadDto): Promise<IDatabaseResult<FileDto>> {
        let query = `INSERT INTO tfiles (idfile, filename, extension, tags, size, mimetype, filedata, filecreated)
                                VALUES(@idfile
                                    ,@filename
                                    ,@extension
                                    ,@tags
                                    ,@size
                                    ,@mimetype
                                    ,@filedata
                                    ,@filecreated)
                                RETURNING idfile, filename, filecreated`;
        return dbEngine.querySingleAsync<FileDto>({
            text: query,
            values:{
                idfile: uuid.v4(),
                filename: upload.fileName,
                extension: upload.extension,
                tags: upload.tags || null,
                size: upload.size,
                mimetype: upload.mimeType,
                filedata: upload.hexData,
                filecreated: new Date().toISOString()
            }
        })
    }

    updateFileAsync(content: UploadDto): Promise<IDatabaseResult<FileDto>> {
        return undefined;
    }

}