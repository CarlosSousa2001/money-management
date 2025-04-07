import { cardTypeEnumBase } from "@/app/(main)/credit-card/new/types/credit-card-types-schema";


export const cardTypeTranslations: Record<cardTypeEnumBase, string> = {
    [cardTypeEnumBase.CREDIT]: "Crédito",
    [cardTypeEnumBase.DEBIT]: "Débito",
};

export function translateCardType(key: cardTypeEnumBase): string {
    return cardTypeTranslations[key] || key;
}
