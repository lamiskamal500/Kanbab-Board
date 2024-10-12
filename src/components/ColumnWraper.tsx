import React, { useState } from "react";
import IconButton from "./IconButton";
import addIcon from "../assets/add.png";
import AddModal from "./AddModal";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  setCardFirstContact,
  setCardPreparingWorkOffer,
  setCardSendToTherapist,
  setCardUnclaimed,
} from "../store/slices/boardSlice";

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
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      const { title, age, email, phone, name } = item;
      switch (cardType) {
        case "Unclaimed":
          dispatch(setCardUnclaimed({ title, age, email, phone, name }));
          break;
        case "First Contact":
          dispatch(setCardFirstContact({ title, age, email, phone, name }));
          break;
        case "Preparing Work Offer":
          dispatch(
            setCardPreparingWorkOffer({ title, age, email, phone, name })
          );
          break;
        case "Send To Therapist":
          dispatch(setCardSendToTherapist({ title, age, email, phone, name }));
          break;
        default:
          break;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      ref={drop}
      className={`bg-secondary-100 p-2 rounded-lg w-full h-[75vh] overflow-y-auto scrollbar ${
        isOver ? "bg-blue-200" : ""
      }`}
    >
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
