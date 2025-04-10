import { Color } from "@/app/(main)/credit-card/new/credit-card-form";

export const getColorsCard = (color: Color) => {
    const colorVariants: { [key in Color]: [string, string, string] } = {
        slate: ["#000000", "#303030", "#000000"],
        violet: ["#4a00e0", "#8e2de2", "#4a00e0"],
        orange: ["#ff8000", "#ffaa00", "#ff8000"],
        gold: ["#b8860b", "#ffd700", "#b8860b"],
        sky: ["#0033cc", "#00ccff", "#0033cc"],
        green: ["#005c4b", "#00c98d", "#005c4b"],
    };

    return colorVariants[color];
};

export const getColorNameFromArray = (colors: [string, string, string]): Color | undefined => {
    const colorVariants: { [key in Color]: [string, string, string] } = {
        slate: ["#000000", "#303030", "#000000"],
        violet: ["#4a00e0", "#8e2de2", "#4a00e0"],
        orange: ["#ff8000", "#ffaa00", "#ff8000"],
        gold: ["#b8860b", "#ffd700", "#b8860b"],
        sky: ["#0033cc", "#00ccff", "#0033cc"],
        green: ["#005c4b", "#00c98d", "#005c4b"],
    };

    return Object.entries(colorVariants).find(
        ([, value]) => JSON.stringify(value) === JSON.stringify(colors)
    )?.[0] as Color | undefined;
};
