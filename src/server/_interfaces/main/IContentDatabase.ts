import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {UploadedFileDto} from "../engine/dto/UploadedFileDto";

export interface IContentDatabase{
    insertUploadedFileAsync(content: UploadedFileDto): Promise<IDatabaseResult<FileDto>>;
    insertFileAsync(content: FileDto): Promise<IDatabaseResult<FileDto>>;
    updateFileAsync(content: FileDto): Promise<IDatabaseResult<FileDto>>;
    findFileDtoByIdAsync(idfile: string): Promise<IDatabaseResult<FileDto>>;
}