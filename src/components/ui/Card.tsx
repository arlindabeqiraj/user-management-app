import React from "react";
import { CardProps } from "../../types";

const Card: React.FC<CardProps> = ({ children, className = "", title }) => {
  const cardClasses = `
    bg-white rounded-lg shadow-sm border border-gray-200 p-6
    ${className}
  `.trim();

  return (
    <div className={cardClasses}>
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
