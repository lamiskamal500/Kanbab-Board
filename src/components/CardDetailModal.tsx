import React from "react";
import ModalLayout from "./ModalLayout";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  age: string;
  email: string;
  phone: string;
  name: string;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  age,
  email,
  phone,
  name,
}) => {
  if (!isOpen) return null;

  return (
    <ModalLayout isOpen={isOpen}>
      {[
        { label: "Title", value: title },
        { label: "Name", value: name },
        { label: "Age", value: `${age} years old` },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
      ].map((item, index) => (
        <p key={index}>
          <strong>{item.label}:</strong>
          <span className="ml-1 text-[14px]">{item.value}</span>
        </p>
      ))}
      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white rounded px-3 py-1"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </ModalLayout>
  );
};

export default CardDetailModal;
