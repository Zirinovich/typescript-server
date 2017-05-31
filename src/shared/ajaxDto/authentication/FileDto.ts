export interface FileDto{
    idfile: string,
    filename: string,
    extension?: string,
    tags?: string,
    size?: number,
    mimetype?: string,
    filedata?: any,
    filecreated: string
    fileupdated?: string
}
