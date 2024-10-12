import React from "react";

interface TextInputProps {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  name,
  onChange,
  placeholder,
  onBlur,
  error,
  type,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-black-100 rounded-md p-1 font-400 text-sm text-gray-700 
        focus:border-blue-500 focus:border-1 focus:outline-none w-full"
        onBlur={onBlur}
        type={type}
      />
      <div className="text-red-600 text-[12px]">{error}</div>
    </div>
  );
};

export default TextInput;
