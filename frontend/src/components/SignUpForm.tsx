import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  resetForm,
  setError,
  setSignUpFormData,
} from "../redux/reducers/signupFormSlice";
import { addUserAsync } from "../redux/thunks/usersThunks";
import InputField from "./InputField";

const SignUpForm = () => {
  const formData = useSelector(
    (state: RootState) => state.signupForm.signUpFormData
  );
  const error = useSelector((state: RootState) => state.signupForm.error);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    dispatch(setSignUpFormData({ ...formData, [inputName]: inputValue }));
    dispatch(setError(null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmed) {
      dispatch(setError("Passwords did not match."));
      dispatch(
        setSignUpFormData({ ...formData, password: "", passwordConfirmed: "" })
      );
      return;
    }
    dispatch(addUserAsync(formData));
    dispatch(resetForm());
  };

  return (
    <div className="flex flex-row justify-center items-center py-24">
      <div className="w-xl bg-white rounded-xl p-8">
        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
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
          <InputField
            label="Confirm Password"
            name="passwordConfirmed"
            type="password"
            value={formData.passwordConfirmed}
            onChange={handleChange}
            placeholder="Confirm password"
            error={error}
          />
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

export default SignUpForm;
