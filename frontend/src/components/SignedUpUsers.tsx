import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import TableRow from "./TableRow";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";

const selectUsers = (state: RootState) => state.users.users;
const selectCurrentUserName = (state: RootState) => state.user.userName;
const selectNonAdminUsers = createSelector(
  [selectUsers, selectCurrentUserName],
  (users, currentUserName) =>
    users.filter((user) => user.name !== currentUserName)
);

const SignedUpUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nonAdminUsers = useSelector(selectNonAdminUsers);
  const isLoading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  // Wait until not loading and users are available
  if (isLoading) return null;

  if (nonAdminUsers.length === 0) {
    return (
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No users have signed up yet.
        </h2>
        <p className="text-gray-600">New users will appear here once they register.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Signed Up Users
      </h2>
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
            {nonAdminUsers.map((prev) => (
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
