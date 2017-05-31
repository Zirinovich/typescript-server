import {IContentDatabase} from "../../_interfaces/main/IContentDatabase";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import {dbEngine} from "../../registration";

import uuid = require("uuid");

export class ContentDatabase implements IContentDatabase {
    insertUploadedFileAsync(upload: UploadedFileDto): Promise<IDatabaseResult<FileDto>> {
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
            values: {
                idfile: uuid.v4(),
                filename: upload.fileName,
                extension: upload.extension,
                tags: upload.tags,
                size: upload.size,
                mimetype: upload.mimeType,
                filedata: upload.hexData,
                filecreated: new Date().toISOString()
            }
        });
    }

    insertFileAsync(file: FileDto): Promise<IDatabaseResult<FileDto>> {
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
            values: {
                idfile: uuid.v4(),
                filename: file.filename,
                extension: file.extension,
                tags: file.tags,
                size: file.size,
                mimetype: file.mimetype,
                filedata: file.filedata,
                filecreated: new Date().toISOString()
            }
        });
    }

    updateFileAsync(file: FileDto): Promise<IDatabaseResult<FileDto>> {
        let query = `UPDATE tfiles
                     SET filename = @filename
                         extension = @extension
                         tags = @tags
                         size = @size
                         mimetype = @mimetype
                         filedata = @filedata
                         fileupdated = @fileupdated
                     WHERE idfile = @idfile
                     RETURNING  idfile, filename, filecreated, fileupdated`;
        return dbEngine.querySingleAsync<FileDto>({
            text: query,
            values: {
                filename: file.idfile,
                extension: file.extension,
                tags: file.tags,
                size: file.size,
                mimetype: file.mimetype,
                filedata: file.filedata,
                fileupdated: new Date().toISOString()
            }
        });
    }
}