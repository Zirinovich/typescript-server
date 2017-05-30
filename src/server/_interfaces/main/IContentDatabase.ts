import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadDto} from "../engine/dto/UploadDto";

export interface IContentDatabase{
    insertFileAsync(content: UploadDto): Promise<IDatabaseResult<FileDto>>;
    updateFileAsync(content: UploadDto): Promise<IDatabaseResult<FileDto>>;
}