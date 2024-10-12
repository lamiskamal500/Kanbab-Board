import React from "react";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setCardUnclaimed } from "../store/slices/boardSlice";

interface FormValues {
  id?: number;
  title: string;
  name: string;
  age: string;
  email: string;
  phone: string;
}

const FormComponent: React.FC = () => {
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
      dispatch(setCardUnclaimed(values));
      resetForm();
      (document.activeElement as HTMLElement)?.blur();
    },
    validateOnChange: true,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col m-4 p-6 border-2 border-gray-100 rounded-lg gap-0 w-[280px]"
    >
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

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md mt-4 transition-colors shadow-lg duration-300 ease-in-out hover:bg-blue-600 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
