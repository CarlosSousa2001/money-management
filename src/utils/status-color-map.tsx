import { TransactionStatusBase } from "@/app/(main)/home/types/home-types-schema";

const statusColorMap: Record<string, string> = {
  "Pendente": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Concluído": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Cancelado": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function renderTransactionStatusTag(status: string) {
  const classes = statusColorMap[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  return (
    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ${classes}`}>
      {status}
    </span>
  );
}