import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UploadedFileDto} from "../engine/dto/UploadedFileDto";
import {FileDto} from "../../../shared/ajaxDto/authentication/FileDto";
import {ContentDto} from "../../../shared/ajaxDto/authentication/ContentDto";

export interface IContentLogic{
    uploadFileAsync(content: UploadedFileDto): Promise<IDatabaseResult<FileDto>>;
    addChangeFileAsync(content: FileDto): Promise<IDatabaseResult<FileDto>>;
    findFileDtoByIdAsync(idfile: string): Promise<IDatabaseResult<FileDto>>;

    addChangeContentAsync(content: ContentDto): Promise<IDatabaseResult<ContentDto>>;
}