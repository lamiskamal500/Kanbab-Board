import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateCardById } from "../store/slices/boardSlice";
import TextInput from "./TextInput";
import * as Yup from "yup";
import ModalLayout from "./ModalLayout";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  age: string;
  email: string;
  phone: string;
  name: string;
  id: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  age,
  email,
  phone,
  name,
  id,
}) => {
  const dispatch = useDispatch();

  const initialValues = { title, age, email, phone, name };

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
      dispatch(updateCardById({ id, updatedCard: values }));
      onClose();
      resetForm();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });
  if (!isOpen) return null;

  return (
    <ModalLayout isOpen={isOpen} title="Edit Card">
      <form onSubmit={handleSubmit} className="flex flex-col rounded-lg gap-0">
        <TextInput
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title && touched.title ? errors.title : ""}
        />
        <TextInput
          label="Age"
          name="age"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.age && touched.age ? errors.age : ""}
        />
        <TextInput
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email ? errors.email : ""}
        />
        <TextInput
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone && touched.phone ? errors.phone : ""}
        />
        <TextInput
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name && touched.name ? errors.name : ""}
        />
        <div className="flex justify-end gap-1">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-1"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 text-white rounded px-3 py-1 mr-2"
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

export default EditModal;
