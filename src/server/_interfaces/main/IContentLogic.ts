import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UploadDto} from "../engine/dto/UploadDto";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";

export interface IContentLogic{
    addChangeFileAsync(content: UploadDto): Promise<IDatabaseResult<FileDto>>;
}