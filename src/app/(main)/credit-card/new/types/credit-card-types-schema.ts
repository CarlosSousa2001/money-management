import { PaginatedBase, ResponseDataBase, ResponseDataBaseSimple } from "@/utils/paginated-base";
import { StatusDefaultActiveInactive } from "@/utils/status-default-active-inactive";

export enum cardTypeEnumBase {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}

interface CardFormBase {
    id: string
    name: string;
    number: string;
    company: string;
    flag: string;
    expiredDate: String;
    cardType: cardTypeEnumBase;
    status: StatusDefaultActiveInactive;
    colors: string[];
}

export type CreateCreditDebitCard = Omit<CardFormBase, "id" | "status">;
export type UpdateCreditDebitCard = CardFormBase

export type CreditDebitCardResponse = ResponseDataBaseSimple<CardFormBase>;
export type CreditDebitCardResponseList = ResponseDataBase<CardFormBase>;
