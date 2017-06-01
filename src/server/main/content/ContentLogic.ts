import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase} from "../../registration";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import uuid = require("uuid");
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";

export class ContentLogic implements IContentLogic {

    static contentMimeType = "text/html,application/xhtml+xml,application/xml";

    async uploadFileAsync(upload: UploadedFileDto): Promise<IDatabaseResult<FileDto>> {

        return contentDatabase.insertUploadedFileAsync(upload);
    }

    async addChangeFileAsync(file: FileDto): Promise<IDatabaseResult<FileDto>> {

        return new Promise<IDatabaseResult<FileDto>>(async resolve => {
            let changeResult = await contentDatabase.updateFileAsync(file);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(changeResult);
            }
            let addResult = await contentDatabase.insertFileAsync(file);
            resolve(addResult);
        });
    }

    async findFileDtoByIdAsync(idfile: string): Promise<IDatabaseResult<FileDto>> {
        return contentDatabase.findFileDtoByIdAsync(idfile);
    }

    async addChangeContentAsync(content: ContentDto, tags): Promise<IDatabaseResult<ContentDto>> {
        return new Promise<IDatabaseResult<ContentDto>>(async resolve => {
            let changeResult = await contentDatabase.updateContentAsync(content, tags);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(changeResult);
            }

            let file = await contentDatabase.insertUploadedFileAsync({
                fileName: `${content.idcontent}-${new Date().toISOString().replace(/\D/g, "-").substr(0, 21)}.content`,
                size: tags.length / 2,
                tags: tags,
                mimeType: ContentLogic.contentMimeType,
                hexData: content.filedata,
                encoding: "utf8",
                extension: "content"
            });

            if (file.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(<IDatabaseResult<any>>file)
            }

            resolve(contentDatabase.insertContentAsync({idcontent: content.idcontent, idfile: file.data.idfile}));
        });
    }

    async findContentDtoByIdAsync(idcontent: string): Promise<IDatabaseResult<ContentDto>> {
        return contentDatabase.findContentDtoByIdAsync(idcontent);
    }

    async getContentListAsync(): Promise<IDatabaseResult<ContentDto[]>> {
        return contentDatabase.getContentListAsync();
    }
}
