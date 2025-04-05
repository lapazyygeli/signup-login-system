
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  resetForm,
  setError,
  setLoginFormData,
} from "../redux/reducers/loginSlice";
import InputField from "./InputField";
import { Link } from "react-router";
import loginAsync from "../redux/thunks/authThunks";

const LoginForm = () => {
  const formData = useSelector((state: RootState) => state.login.loginFormData);
  const error = useSelector((state: RootState) => state.login.error);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    dispatch(setLoginFormData({ ...formData, [inputName]: inputValue }));
    dispatch(setError(null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAsync(formData));
    dispatch(resetForm());
  };

  return (
    <div className="flex flex-row justify-center items-center py-24">
      <div className="w-xl bg-white rounded-xl p-8">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            error={error}
          />
          <button
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 space-x-1">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
