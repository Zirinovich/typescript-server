export interface UploadedFileDto{
    fieldName?: string;
    fileName?: string;
    size: number;
    tags?: string;
    mimeType: string;
    hexData: string;
    encoding: string;
    extension: string;
}