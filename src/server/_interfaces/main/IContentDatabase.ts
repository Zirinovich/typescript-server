import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
export interface IContentDatabase{
    insertContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>>;
    updateContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>>;
}