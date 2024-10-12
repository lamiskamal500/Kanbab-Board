import React, { useState } from "react";
import Dropdown from "./DropDown";
import { useDispatch } from "react-redux";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import readIcon from "../assets/eye.png";
import IconButton from "./IconButton";
import CardDetailModal from "./CardDetailModal"; // Import the modal
import EditModal from "./EditModal";
import {
  setCardFirstContact,
  setCardUnclaimed,
  setCardSendToTherapist,
  setCardPreparingWorkOffer,
  removeCardUnclaimed,
  removeFirstContact,
  removePreparingWorkOffer,
  removeSendToTherapist,
} from "../store/slices/boardSlice";

interface InfoCardProps {
  id: string;
  title: string;
  age: string;
  email: string;
  phone: string;
  name: string;
  status: "Unclaimed" | "First Contact" | "Work Offer" | "Send to Therapist";
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  age,
  email,
  phone,
  status,
  name,
  id,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  let options: string[];

  switch (status) {
    case "Unclaimed":
      options = ["First Contact", "Work Offer", "Send to Therapist"];
      break;
    case "First Contact":
      options = ["UnClaimed", "Work Offer", "Send to Therapist"];
      break;
    case "Work Offer":
      options = ["UnClaimed", "First Contact", "Send to Therapist"];
      break;
    case "Send to Therapist":
      options = ["UnClaimed", "First Contact", "Work Offer"];
      break;
    default:
      options = [];
  }

  const handleSelect = (option: string) => {
    switch (status) {
      case "Unclaimed":
        dispatch(removeCardUnclaimed(id));
        break;
      case "First Contact":
        dispatch(removeFirstContact(id));
        break;
      case "Work Offer":
        dispatch(removePreparingWorkOffer(id));
        break;
      case "Send to Therapist":
        dispatch(removeSendToTherapist(id));
        break;
      default:
        break;
    }
    switch (option) {
      case "UnClaimed":
        dispatch(setCardUnclaimed({ title, age, email, phone, name }));
        break;
      case "First Contact":
        dispatch(setCardFirstContact({ title, age, email, phone, name }));
        break;
      case "Work Offer":
        dispatch(setCardPreparingWorkOffer({ title, age, email, phone, name }));
        break;
      case "Send to Therapist":
        dispatch(setCardSendToTherapist({ title, age, email, phone, name }));
        break;
      default:
        break;
    }
  };

  // Handle card deletion based on the current status
  const handleDelete = () => {
    switch (status) {
      case "Unclaimed":
        dispatch(removeCardUnclaimed(id));
        break;
      case "First Contact":
        dispatch(removeFirstContact(id));
        break;
      case "Work Offer":
        dispatch(removePreparingWorkOffer(id));
        break;
      case "Send to Therapist":
        dispatch(removeSendToTherapist(id));
        break;
      default:
        break;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-lg w-full mt-2">
      <div className="flex flex-row justify-between">
        <div className="text-gray-700 font-bold text-[18px]">{title}</div>
        <div className="text-gray-100 font-semibold text-[14px]">{age} yo</div>
      </div>
      <div className="text-gray-700 text-[14px] font-semibold ">{email}</div>
      <div className="text-gray-100 text-[14px] font-semibold">{phone}</div>
      <div className="flex flex-row justify-between items-center">
        <Dropdown options={options} onSelect={handleSelect} />
        <div className="flex flex-row gap-1 ">
          <IconButton
            icon={editIcon}
            alt="Edit"
            onClick={() => setEditModal(true)}
          />
          <IconButton icon={readIcon} alt="View" onClick={openModal} />
          <IconButton icon={deleteIcon} alt="Delete" onClick={handleDelete} />
        </div>
      </div>

      <CardDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        age={age.toString()}
        email={email}
        phone={phone}
        name={name}
      />
      <EditModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title={title}
        age={age.toString()}
        email={email}
        phone={phone}
        name={name}
        id={id}
      />
    </div>
  );
};

export default InfoCard;
