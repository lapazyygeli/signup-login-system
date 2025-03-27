import { useState } from "react";

type Props = {
  addData: (formData: FormData) => void;
}

export interface FormData {
  name: string;
  password: string;
  passwordConfirmed: string;
}

const initialState: FormData = {
  name: "",
  password: "",
  passwordConfirmed: "",
};

const Form = ({ addData }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="passwordConfirmed">Confirm Password</label>
      <input
        id="passwordConfirmed"
        name="passwordConfirmed"
        value={formData.passwordConfirmed}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
