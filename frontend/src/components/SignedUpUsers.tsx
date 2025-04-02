import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TableRow from "./TableRow";

const SignedUpUsers = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>password</th>
          <th>passwordConfirmed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((prev) => (
          <TableRow
            key={prev._id}
            id={prev._id}
            name={prev.name}
            password={prev.password}
            passwordConfirmed={prev.passwordConfirmed}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SignedUpUsers;
