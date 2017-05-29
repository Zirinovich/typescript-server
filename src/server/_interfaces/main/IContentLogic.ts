import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";

export interface IContentLogic{
    addChangeContentAsync(content: ContentDto): Promise<IDatabaseResult<void>>;
}