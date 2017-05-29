import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UploadedFileDto} from "../engine/dto/UploadedFileDto";
import {UploadDto} from "../../../shared/ajaxDto/authentication/UploadDto";

export interface IContentLogic{
    addChangeContentAsync(content: UploadedFileDto): Promise<IDatabaseResult<UploadDto>>;
}