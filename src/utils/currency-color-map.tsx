import { CurrencyType } from "@/app/(main)/home/types/home-types-schema";


const currencyColorMap: Record<CurrencyType, string> = {
  [CurrencyType.USD]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [CurrencyType.EUR]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [CurrencyType.BRL]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [CurrencyType.GBP]: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  [CurrencyType.JPY]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  [CurrencyType.AUD]: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  [CurrencyType.CAD]: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  [CurrencyType.CHF]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  [CurrencyType.CNY]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [CurrencyType.INR]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [CurrencyType.MXN]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  [CurrencyType.RUB]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  [CurrencyType.ZAR]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

export function renderCurrencyTag(currency: CurrencyType) {
  const classes = currencyColorMap[currency] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  return (
    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ${classes}`}>
      {currency}
    </span>
  );
}
