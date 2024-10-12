import React from "react";

interface IconButtonProps {
  icon: string;
  alt: string;
  iconColor?: string;
  hoverColor?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  iconColor,
  hoverColor,
}) => {
  return (
    <button
      className={`p-1.5 rounded-full ${
        hoverColor ?? " hover:bg-gray-400"
      } transition cursor-pointer ${iconColor ?? "bg-gray-300"}`}
      onClick={onClick}
    >
      <img src={icon} alt={alt} className="w-4 h-4" />
    </button>
  );
};

export default IconButton;
