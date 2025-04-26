import { PaginatedBase, ResponseDataBase, ResponseDataBaseSimple } from "@/utils/paginated-base";
import { TransactionPayerReceiverBase } from "../../home/types/home-types-schema";

interface PayerOrReceiverBase {
    id: string
    name: string;
    description: string;
    imgUrl?: string;
    userType: TransactionPayerReceiverBase
}

export type PayerOrReceiverRequest = Omit<PayerOrReceiverBase, "id">
export type PayerOrReceiverUpdate = PayerOrReceiverBase

export type PayerOrReceiverBaseUnit = PayerOrReceiverBase
export type PayerOrRecebicerResponseSimple = ResponseDataBaseSimple<PayerOrReceiverBase>
export type PayerOrReceiverResponse = PaginatedBase<PayerOrReceiverBase>
