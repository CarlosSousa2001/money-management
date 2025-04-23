import { http } from "@/lib/http";
import { FileUploadMinioREquest, FileUploadMinioResponse } from "../types/user-schemas-types";


export async function uploadFileMinio({ fileName, contentType }: FileUploadMinioREquest) {
    const response = await http
        .post("files/upload", {
            json: {
                fileName,
                contentType,
            },
        })
        .json<FileUploadMinioResponse>();

    return response;
}