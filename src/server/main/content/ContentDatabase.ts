import {IContentDatabase} from "../../_interfaces/main/IContentDatabase";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";

export class ContentDatabase implements IContentDatabase{

    insertContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>> {
        return undefined;
    }

    updateContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>> {
        return undefined;
    }

}