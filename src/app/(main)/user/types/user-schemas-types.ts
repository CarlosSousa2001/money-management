import { S } from "vitest/dist/chunks/config.d.DevWltVl.js"
import { TransactionPayerReceiverBase } from "../../home/types/home-types-schema"
import { ResponseDataBaseSimple } from "@/utils/paginated-base"

interface Address {
    id?: string
    street: string
    city: string
    state: string
    zipCode: string
    neighborhood: string
    complement?: string
}

interface Card {
    id: string
    name: string
    number: string
    company: string
    flag: string
    expiredDate: string
    colors: string[]
    cardType: number
    status: number
}

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


// User Profile

interface UserProfileBase {
    id: string
    name: string
    email: string
    birthDate?: string
    phone?: string
    imgUrl?: string | null
    addresses?: Address[]
    cards?: Card[]
    type: TransactionPayerReceiverBase
}

export type UserProfileUpadate = Omit<UserProfileBase, "type">

export type UserProfileMeResponse= ResponseDataBaseSimple<UserProfileBase>

