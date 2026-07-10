import React from "react";

interface GameButtonProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
}

export const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  isActive,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={isActive ? "btn--red" : "btn--primary"}
    >
      {label}
    </button>
  );
};
