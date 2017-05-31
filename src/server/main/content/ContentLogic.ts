import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase} from "../../registration";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../../_interfaces/engine/dto/UploadedFileDto";
import uuid = require("uuid");
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";

export class ContentLogic implements IContentLogic {
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

    addChangeContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>>{
        return contentDatabase.insertContentAsync(content);
    }
}
