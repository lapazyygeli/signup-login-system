import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SignedUpUsers from "./SignedUpUsers";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-12 sm:pt-44 px-4 sm:px-16">
      {user.role === "admin" ? (
        <>
          <SignedUpUsers />
          {/*Some other content if needed*/}
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome, {user.userName}
          </h2>
          <p className="text-gray-600">You're logged in as a regular user.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
