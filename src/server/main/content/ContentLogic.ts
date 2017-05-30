import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase} from "../../registration";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadDto} from "../../_interfaces/engine/dto/UploadDto";
import uuid = require("uuid");

export class ContentLogic implements IContentLogic {
    async addChangeFileAsync(upload: UploadDto): Promise<IDatabaseResult<FileDto>> {

        return contentDatabase.insertFileAsync(upload);

        // let changeResult = await contentDatabase.updateContentAsync(content);
        // if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
        //     return resolve(Object.assign({}, {...changeResult}, {data: undefined}));
        // }
        //
        // let addResult = await contentDatabase.insertContentAsync(content);
        // resolve(Object.assign({}, {...addResult}, {data: undefined}));
        // });
    }
}