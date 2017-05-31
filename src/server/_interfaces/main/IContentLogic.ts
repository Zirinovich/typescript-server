import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UploadedFileDto} from "../engine/dto/UploadedFileDto";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";

export interface IContentLogic{
    uploadFileAsync(content: UploadedFileDto): Promise<IDatabaseResult<FileDto>>;
    addChangeFileAsync(content: FileDto): Promise<IDatabaseResult<FileDto>>;
}