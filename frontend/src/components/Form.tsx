import { useState } from "react";

type Props = {
  addData: (formData: FormData) => void;
};

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmed) {
      setError("Passwords did not match.");
      setFormData((prev) => ({
        ...prev,
        password: "",
        passwordConfirmed: "",
      }));
      return;
    }

    addData(formData);
    setFormData(initialState);
  };

  return (
    <div className="flex flex-row justify-center items-center p-4">
      <div className="w-xl bg-white rounded-xl p-8">
        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-medium block mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-al"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="font-medium block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-al"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label
              className="font-medium block mb-1"
              htmlFor="passwordConfirmed"
            >
              Confirm password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-al"
              id="passwordConfirmed"
              name="passwordConfirmed"
              value={formData.passwordConfirmed}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
