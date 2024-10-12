// AddModal.tsx
import React from "react";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import ModalLayout from "./ModalLayout";
import {
  setCardUnclaimed,
  setCardFirstContact,
  setCardPreparingWorkOffer,
  setCardSendToTherapist,
} from "../store/slices/boardSlice";

interface FormValues {
  id?: string;
  title: string;
  name: string;
  age: string;
  email: string;
  phone: string;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardType: string;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, cardType }) => {
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    title: "",
    name: "",
    age: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .typeError("Age must be a number"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      if (cardType === "Unclaimed") {
        dispatch(setCardUnclaimed(values));
      } else if (cardType === "First Contact") {
        dispatch(setCardFirstContact(values));
      } else if (cardType === "Preparing Work Offer") {
        dispatch(setCardPreparingWorkOffer(values));
      } else if (cardType === "Send to Therapist") {
        dispatch(setCardSendToTherapist(values));
      } else {
        console.log("Invalid card type");
      }

      resetForm();
      onClose();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  if (!isOpen) return null;

  return (
    <ModalLayout isOpen={isOpen} title="Add New Card">
      <form onSubmit={handleSubmit} className="flex flex-col rounded-lg gap-0">
        <TextInput
          label="Title"
          value={values.title}
          onChange={handleChange}
          name="title"
          placeholder="ex: Mr, Mrs, Dr"
          onBlur={handleBlur}
          error={errors.title && touched.title ? errors.title : ""}
        />

        <TextInput
          label="Name"
          value={values.name}
          onChange={handleChange}
          name="name"
          placeholder="ex: John Doe"
          onBlur={handleBlur}
          error={errors.name && touched.name ? errors.name : ""}
        />

        <TextInput
          label="Age"
          value={values.age}
          onChange={handleChange}
          name="age"
          placeholder="ex: 25"
          onBlur={handleBlur}
          error={errors.age && touched.age ? errors.age : ""}
        />

        <TextInput
          label="Email"
          value={values.email}
          onChange={handleChange}
          name="email"
          placeholder="ex: lamis88@gmail.com"
          onBlur={handleBlur}
          error={errors.email && touched.email ? errors.email : ""}
        />

        <TextInput
          label="Phone"
          value={values.phone}
          onChange={handleChange}
          name="phone"
          placeholder="ex: 01123456789"
          onBlur={handleBlur}
          error={errors.phone && touched.phone ? errors.phone : ""}
        />

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-1"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 text-white rounded px-3 py-1"
            onClick={() => {
              onClose();
              resetForm();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddModal;
