import { TransactionPayerReceiverBase, TransactionResponsePaginated, TransactionStatusBase, TransactionTypeBase } from "../types/home-types-schema";

export const payload: TransactionResponsePaginated = {
    data: [
      {
        id: "3225",
        code: "T207852",
        typeTransaction: TransactionTypeBase.PAY,
        payerReceiver: {
          id: "3216",
          name: "José Silva Sales",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.PERSON
        },
        transactionDate: "2025-03-18 23:40:00",
        amount: 2412.4,
        category: null,
        status: TransactionStatusBase.PENDING
      },
      {
        id: "3640",
        code: "T360490",
        typeTransaction: TransactionTypeBase.PAY,
        payerReceiver: {
          id: "3543",
          name: "Carlos Sousa",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.COMPANY
        },
        transactionDate: "2025-03-04 23:40:00",
        amount: 3754.7,
        category: null,
        status: TransactionStatusBase.FAILED
      },
      {
        id: "4594",
        code: "T666100",
        typeTransaction: TransactionTypeBase.PAY,
        payerReceiver: {
          id: "2485",
          name: "Chris Rodrigues",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.PERSON
        },
        transactionDate: "2025-02-28 23:40:00",
        amount: 3217.89,
        category: "Categoria 3",
        status: TransactionStatusBase.COMPLETED
      },
      {
        id: "5001",
        code: "T890123",
        typeTransaction: TransactionTypeBase.RECEIVE,
        payerReceiver: {
          id: "4002",
          name: "Mariana Costa",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.PERSON
        },
        transactionDate: "2025-01-15 14:30:00",
        amount: 1500.00,
        category: "Salário",
        status: TransactionStatusBase.COMPLETED
      },
      {
        id: "6002",
        code: "T560789",
        typeTransaction: TransactionTypeBase.PAY,
        payerReceiver: {
          id: "5010",
          name: "Empresa XYZ",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.COMPANY
        },
        transactionDate: "2025-03-10 10:00:00",
        amount: 500.75,
        category: "Serviços",
        status: TransactionStatusBase.PENDING
      },
      {
        id: "7003",
        code: "T778912",
        typeTransaction: TransactionTypeBase.RECEIVE,
        payerReceiver: {
          id: "6020",
          name: "João Pedro",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.PERSON
        },
        transactionDate: "2025-02-05 18:20:00",
        amount: 1200.50,
        category: "Freelance",
        status: TransactionStatusBase.COMPLETED
      },
      {
        id: "8004",
        code: "T990101",
        typeTransaction: TransactionTypeBase.PAY,
        payerReceiver: {
          id: "7015",
          name: "Supermercado ABC",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.COMPANY
        },
        transactionDate: "2025-03-21 12:45:00",
        amount: 250.30,
        category: "Alimentação",
        status: TransactionStatusBase.FAILED
      },
      {
        id: "9005",
        code: "T112233",
        typeTransaction: TransactionTypeBase.RECEIVE,
        payerReceiver: {
          id: "8025",
          name: "Banco Central",
          iconUrl: "https://picsum.photos/200",
          type: TransactionPayerReceiverBase.COMPANY
        },
        transactionDate: "2025-02-28 09:00:00",
        amount: 5000.00,
        category: "Empréstimo",
        status: TransactionStatusBase.COMPLETED
      }
    ],
    meta: {
      totalItems: 12,
      totalPages: 1,
      page: 1,
      perPage: 12,
      nextPage: null,
      prevPage: null
    }
  };

export async function getAllTransactionHomeBase() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return payload;
}
