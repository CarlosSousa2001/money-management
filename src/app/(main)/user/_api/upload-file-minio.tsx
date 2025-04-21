import { http } from "@/lib/http";
import { FileUploadMinioREquest, FileUploadMinioResponse } from "../types/user-schemas-types";
import { getCookie } from "cookies-next";


export async function uploadFileMinio({ fileName, contentType }: FileUploadMinioREquest) {
    const cookies = getCookie("sshtk")

    const response = await http
        .post("files/upload", {
            json: {
                fileName,
                contentType,
            },
        })
        .json<FileUploadMinioResponse>();

    console.log("Depois do upload : " + cookies)
    return response;
}