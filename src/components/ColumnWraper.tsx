import React, { useState } from "react";
import IconButton from "./IconButton";
import addIcon from "../assets/add.png";
import AddModal from "./AddModal";

interface ColumnWarperProps {
  children: React.ReactNode;
  cardType: string;
  count: number;
}

const ColumnWarper: React.FC<ColumnWarperProps> = ({
  children,
  cardType,
  count,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-secondary-100 p-2 rounded-lg w-full h-[75vh] overflow-y-auto scrollbar">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1.5">
          <div className="text-gray-700 font-bold">{cardType}</div>
          <IconButton
            icon={addIcon}
            alt="add"
            iconColor="bg-white"
            hoverColor="hover:bg-gray-300"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="bg-white text-gray-700 font-bold rounded-full w-8 h-6 flex items-center justify-center">
          {count}
        </div>
      </div>
      {children}
      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cardType={cardType}
      />
    </div>
  );
};

export default ColumnWarper;
