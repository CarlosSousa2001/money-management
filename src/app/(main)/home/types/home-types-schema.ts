import { PaginatedBase } from "@/utils/paginated-base";

export enum TransactionCategory {
    SCHEDULED_DATE = "SCHEDULED_DATE",
    SERVICES = "SERVICES",
    FOOD = "FOOD",
    TRANSPORT = "TRANSPORT",
    HOUSING = "HOUSING",
    HEALTH = "HEALTH",
    EDUCATION = "EDUCATION",
    LEISURE = "LEISURE",
    SHOPPING = "SHOPPING",
    SALARY = "SALARY",
    TAXES = "TAXES",
    INVESTMENTS = "INVESTMENTS",
    ENTERTAINMENT = "ENTERTAINMENT",
    DONATIONS = "DONATIONS",
    GIFTS = "GIFTS",
    TRAVEL = "TRAVEL",
    OTHER = "OTHER",
}

export enum CurrencyType {
    USD = "USD", // Dólar americano
    EUR = "EUR", // Euro
    BRL = "BRL", // Real brasileiro
    GBP = "GBP", // Libra esterlina
    JPY = "JPY", // Iene japonês
    AUD = "AUD", // Dólar australiano
    CAD = "CAD", // Dólar canadense
    CHF = "CHF", // Franco suíço
    CNY = "CNY", // Yuan chinês
    INR = "INR", // Rupia indiana
    MXN = "MXN", // Peso mexicano
    RUB = "RUB", // Rublo russo
    ZAR = "ZAR", // Rand sul-africano
}


export enum PaymentType {
    PIX = "PIX",
    TED = "TED",
    BOLETO = "Boleto",
    CREDIT_CARD = "Credit Card",
    DEBIT_CARD = "Debit Card",
    BANK_TRANSFER = "Bank Transfer",
    CASH = "Cash",
}

export enum TransactionTypeBase {
    RECEIVE = "Receive",
    PAY = "Pay",
}

export enum TransactionPayerReceiverBase {
    PERSON = "Person",
    COMPANY = "Company",
}

export enum TransactionStatusBase {
    PENDING = "Pending",
    COMPLETED = "Completed",
    FAILED = "Cancelled",
}


interface Trasanctionbase {
    id: string;
    code: string;
    typeTransaction: TransactionTypeBase
    payerReceiver: {
        id: string;
        name: string;
        iconUrl: string;
        type: TransactionPayerReceiverBase
    };
    transactionDate: string;
    amount: number;
    category?: string | null;
    status: TransactionStatusBase;
}

export type TransactionResponse = Trasanctionbase

export type TransactionResponsePaginated = PaginatedBase<Trasanctionbase>