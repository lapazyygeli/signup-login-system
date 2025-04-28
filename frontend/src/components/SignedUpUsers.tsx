import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TableRow from "./TableRow";

const SignedUpUsers = () => {
  const users = useSelector((state: RootState) => state.users.users);
  // TODO: automatic fetch from database

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Users</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className="pr-6">Name</th>
              <th className="pr-6">Password</th>
              <th className="pr-6">Confirmed password</th>
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
      </div>
    </div>
  );
};

export default SignedUpUsers;
