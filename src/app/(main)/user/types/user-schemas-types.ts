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

// User Profile

interface PermissionsBase {
    id: number,
    name: string
    slugName: string
}

interface RolesBase {
    id: number
    name: string
    permissions: PermissionsBase[]
}

interface UserProfileBase {
    id: string
    name: string
    email: string
    birthDate?: string
    phone?: string
    imgUrl?: string | null
    address?: Address
    cards?: Card[]
    type: TransactionPayerReceiverBase
    roles: RolesBase[]
}

export type UserProfileUpadate = Omit<UserProfileBase, "type">

export type UserProfileMeResponse = ResponseDataBaseSimple<UserProfileBase>

