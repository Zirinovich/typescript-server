import {IContentLogic} from "../../_interfaces/main/IContentLogic";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {contentDatabase} from "../../registration";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";

export class ContentLogic implements IContentLogic {
    async addChangeContentAsync(content: ContentDto): Promise<IDatabaseResult<void>> {
        return new Promise<IDatabaseResult<void>>(async resolve => {
            let changeResult = await contentDatabase.updateContentAsync(content);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(Object.assign({}, {...changeResult}, {data: undefined}));
            }

            let addResult = await contentDatabase.insertContentAsync(content);
            resolve(Object.assign({}, {...addResult}, {data: undefined}));
        });
    }
}