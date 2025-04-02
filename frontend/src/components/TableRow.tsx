import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteUserAsync } from "../redux/thunks/usersThunks";

interface Props {
  id: string;
  name: string;
  password: string;
  passwordConfirmed: string;
}

const TableRow = ({ id, name, password, passwordConfirmed }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <tr>
      <td>{name}</td>
      <td>{password}</td>
      <td>{passwordConfirmed}</td>
      <td>
        <button onClick={() => dispatch(deleteUserAsync(id))}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
