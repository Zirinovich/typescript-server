import {IContentDatabase} from "../../_interfaces/main/IContentDatabase";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import {dbEngine} from "../../registration";

import uuid = require("uuid");
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";

export class ContentDatabase implements IContentDatabase {
    async insertUploadedFileAsync(upload: UploadedFileDto): Promise<IDatabaseResult<FileDto>> {
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

    async insertFileAsync(file: FileDto): Promise<IDatabaseResult<FileDto>> {
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

    async updateFileAsync(file: FileDto): Promise<IDatabaseResult<FileDto>> {
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

    async findFileDtoByIdAsync(idfile: string): Promise<IDatabaseResult<FileDto>> {
        let query = `SELECT idfile
                           ,filename
                           ,extension
                           ,tags
                           ,size
                           ,mimetype
                           ,filedata
                           ,filecreated
                           ,fileupdated
	                FROM public.tfiles
                    WHERE idfile=@idfile`;
        return dbEngine.querySingleAsync<FileDto>({
            text: query,
            values: {idfile}
        });
    }

    async insertContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>> {
        let query = `INSERT INTO tcontent (idcontent, idfile)
                                VALUES(@idcontent
                                    ,@idfile)
                                RETURNING idcontent, idfile`;
        return dbEngine.querySingleAsync<ContentDto>({
            text: query,
            values: {
                idcontent: content.idcontent,
                idfile: content.idfile
            }
        });
    }

    async updateContentAsync(content: ContentDto, tags: string): Promise<IDatabaseResult<ContentDto>> {
        let query = `UPDATE tfiles
                     SET tags = @tags
                        ,filedata = @filedata
                        ,fileupdated = @fileupdated
                     FROM tcontent
                     WHERE tcontent.idcontent = @idcontent AND tcontent.idfile = tfiles.idfile
                     RETURNING tcontent.idfile AS idfile, tcontent.idcontent AS idcontent;`;

        return dbEngine.querySingleAsync<ContentDto>({
            text: query,
            values: {
                tags: tags,
                filedata: content.filedata,
                fileupdated: new Date().toISOString(),
                idcontent: content.idcontent,
            }
        });
    }

    async deleteContentAsync(ids: string[]): Promise<IDatabaseResult<string[]>> {
        let query = `DELETE FROM tfiles
                     WHERE idfile IN (
                        SELECT idfile 
                        FROM tcontent WHERE idcontent IN (@ids)
                     )
                     RETURNING idfile`;

        return dbEngine.queryAsync<string>({
            text: query,
            values: {ids}
        });
    }

    async findContentDtoByIdAsync(idcontent: string): Promise<IDatabaseResult<ContentDto>> {
        let query = `SELECT
                       idcontent,
                       tcontent.idfile,
                       tfiles.filedata
                     FROM tcontent
                       INNER JOIN tfiles ON tcontent.idfile = tfiles.idfile
                     WHERE idcontent = @idcontent`;
        return dbEngine.querySingleAsync<ContentDto>({
            text: query,
            values: {
                idcontent: idcontent
            }
        });
    }

    async getContentListAsync(): Promise<IDatabaseResult<ContentDto[]>> {
        let query = `SELECT
                       idcontent,
                       tcontent.idfile
                     FROM tcontent
                       INNER JOIN tfiles ON tcontent.idfile = tfiles.idfile`;
        return dbEngine.queryAsync<ContentDto>({text: query});
    }
}
