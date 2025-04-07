import { PaginatedBase } from "@/utils/paginated-base";
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
    expiredDate: string;
    cardType: cardTypeEnumBase;
    status: StatusDefaultActiveInactive;
}

export type CreateCreditDebitCard = Omit<CardFormBase, "id" | "status">;
export type UpdateCreditDebitCard = CardFormBase

export type CreditDebitCardResponse = CardFormBase;
export type PaginatedCreditDebitCardResponse = PaginatedBase<CardFormBase>;
