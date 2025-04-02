import SignUpForm from "./SignUpForm.tsx";
import TableRow from "./TableRow.tsx";
import { SignUpFormData } from "../redux/reducers/signupSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../redux/reducers/usersSlice.ts";
import { RootState } from "../redux/store.ts";

// TÄÄLTÄ SIGN UPISTA PITÄÄ POISTAA TOI TABLE ROW HOMMA JA TEHÄ
// SIITÄ OMA KOMPONENTTINSA. SEN JÄLKEEN SIIRRETÄÄN KAMPET TÄNNE FORMISTA
// JA MUOKATAAN TÄN NIMEKS SIGNUPFORM.

// ADDDATA FUNKTIO LAITETAAN TOTEUTTAA SIELLÄ MIHIN SE TÄÄLLÄ SYÖTETÄÄN
// SAMA MYÖS DELETELLE

export interface UserData {
  _id: string;
  name: string;
  password: string;
  passwordConfirmed: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const deleteData = async (id: string) => {
    const url = `http://localhost:9000/users/delete`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not okay (delete)!");
      }
      const responseJson = await response.json();
      console.log(responseJson.message);
      console.log(responseJson.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(deleteUser(id));
  };

  

  return (
    <>
      <SignUpForm />
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
              deleteData={deleteData}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SignUp;