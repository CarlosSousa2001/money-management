import React, { JSX } from "react";

interface CardProgressItemProps {
  title: string;
  icon: JSX.Element;
  percentage: number;
  variant: "green" | "red" | "blue";
}

const variantStyles = {
  green: {
    bg: "bg-green-200",
    bar: "bg-green-300",
    icon: "text-green-600",
  },
  red: {
    bg: "bg-red-200",
    bar: "bg-red-300",
    icon: "text-red-600",
  },
  blue: {
    bg: "bg-blue-200",
    bar: "bg-blue-300",
    icon: "text-blue-600",
  },
};

export function CardProgressItem({
  title,
  icon,
  percentage,
  variant,
}: CardProgressItemProps) {
  const { bg, bar, icon: iconColor } = variantStyles[variant];

  return (
    <div className="bg-card rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${bg}`}>
          {React.cloneElement(icon, { className: iconColor })}
        </div>
        <h3 className="text-xl text-dark font-semibold">{title}</h3>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span>Meta</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          className={`${bar} h-1.5 rounded-full dark:${bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
