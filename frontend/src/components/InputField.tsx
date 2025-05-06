import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string | null;
}

const InputField: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, type = "text", error }) => (
  <div>
    <label className="font-medium block mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      className="w-full px-4 py-2 border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      maxLength={45}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;