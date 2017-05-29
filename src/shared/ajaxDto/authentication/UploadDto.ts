export interface UploadDto{
    idupload: string,
    name: string,
    extension: string,
    tags?: string,
    link: string,
    type: string,
    dataupload: any,
    uploadcreated?: string
}
