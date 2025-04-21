export interface FileUploadMinio {
    fileName: string
    contentType: string
}

export interface FileUploadMinioResponseBase {
    data: {
        uploadUrl: string
        fileUrl: string
    }
    message: string
    success: boolean
}


export type FileUploadMinioREquest = FileUploadMinio
export type FileUploadMinioResponse = FileUploadMinioResponseBase

