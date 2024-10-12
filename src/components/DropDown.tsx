import React, { useState, useEffect, useRef } from "react";
import arrowImg from "../assets/arrow.png";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Update Status",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create a ref for the dropdown to check if a click is outside of it
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="w-[110px] px-1 text-left border border-blue-500 text-blue-500 bg-transparent rounded-md shadow-md transition duration-200 ease-in-out 
       focus:outline-none focus:ring-2 focus:ring-blue-300 text-[11px] font-semibold"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{placeholder}</span>
          <img src={arrowImg} className="w-3 h-3" alt="Dropdown Arrow" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-1 py-1 text-[12px] hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
