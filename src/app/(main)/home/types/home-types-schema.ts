import { PaginatedBase, ResponseDataBase, ResponseDataBaseSimple } from "@/utils/paginated-base";

export enum TransactionCategory {
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
    BANK_SLIP = "BANK_SLIP",
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
    CASH = "CASH",
}

export enum TransactionTypeBase {
    RECEIVE = "RECEIVE",
    PAY = "PAY",
}

export enum TransactionPayerReceiverBase {
    PERSON = "PERSON",
    COMPANY = "COMPANY",
}

export enum TransactionStatusBase {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "CANCELLED",
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

// metrics 
interface MetricsBase {
    month: string;
    paid: number;
    received: number;
}

export type MetricsResponse = ResponseDataBase<MetricsBase>;

interface WalletHealthBase {
    value: number;
}

export type WalletHealthResponse = ResponseDataBaseSimple<WalletHealthBase>;


// transaction next to due


interface TransactionNextToDueBase {
    id: string;
    category: TransactionCategory;
    description: string;
    date: string;
}

export type TransactionNextToDueResponse = ResponseDataBase<TransactionNextToDueBase>;
