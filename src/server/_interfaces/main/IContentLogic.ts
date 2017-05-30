import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UploadedFileDto} from "../engine/dto/UploadedFileDto";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";

export interface IContentLogic{
    addChangeFileAsync(content: UploadedFileDto): Promise<IDatabaseResult<FileDto>>;
}