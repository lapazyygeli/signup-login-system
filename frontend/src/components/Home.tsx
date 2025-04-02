import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SignedUpUsers from "./SignedUpUsers";

const Home = () => {
  const signedUpUsers = useSelector((state: RootState) => state.users.users);

  return (
    <>
      <p>Home</p>
      {signedUpUsers.length > 0 && <SignedUpUsers />}
    </>
  );
};

export default Home;
