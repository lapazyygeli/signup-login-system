import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import SignedUpUsers from "./SignedUpUsers";
import { useEffect } from "react";
import { getUsersAsync } from "../redux/thunks/usersThunks";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signedUpUsers = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-12 sm:pt-44 px-4 sm:px-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-4">
        Welcome!
      </h1>
      <p className="text-gray-700 text-lg mb-8 text-center max-w-xl">
        This is a simple app built with React, Redux Toolkit, Express, Mongo,
        and TailwindCSS. Feel free to explore and sign up!
      </p>
      {signedUpUsers.length > 0 && <SignedUpUsers />}
    </div>
  );
};

export default Home;
