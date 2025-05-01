import { PaginatedBase, ResponseDataBase, ResponseDataBaseSimple } from "@/utils/paginated-base";
import { CurrencyType, PaymentType, TransactionCategory, TransactionPayerReceiverBase, TransactionStatusBase, TransactionTypeBase } from "../../home/types/home-types-schema";

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

// transaction types

export interface Payment {
    id: string;
    amount: number;
    installments?: number;
    valuePerInstallment?: number;
    paymentType: PaymentType;
    cardId?: string;
}

export type PaymentRequest = Omit<Payment, "id" | "valuePerInstallment">;

export interface PayerReceiver {
    id: string;
    name: string;
    description: string;
    imgUrl: string;
    userType: TransactionPayerReceiverBase;
}

interface TransactionBase {
    id: string;
    description: string;
    email: string;
    currency: CurrencyType;
    amount: number;
    transactionScheduledDate: string; // ISO Date string
    category: TransactionCategory;
    transactionType: TransactionTypeBase;
    status: TransactionStatusBase;
    payerReceiverId: string;
    payments: Payment[];
}

export interface TransactionRequest extends Omit<TransactionBase, "id" | "payments"> {
    payments: PaymentRequest[];
}

export type TransactioUpdateRequest = TransactionBase

interface TransactionBaseResponse {
    id: string;
    description: string;
    email: string;
    currency: CurrencyType;
    amount: number;
    transactionScheduledDate: string; // ISO Date string
    category: TransactionCategory;
    transactionType: TransactionTypeBase;
    status: TransactionStatusBase;
    payerReceiverId: string;
    payerReceiver: PayerReceiver;
    payments: Payment[];
}

export type TransactionResponse = ResponseDataBaseSimple<TransactionBaseResponse>
export type TransactionResponseUnit = TransactionBaseResponse


export type TransactionResponsePaginated = PaginatedBase<TransactionBaseResponse>