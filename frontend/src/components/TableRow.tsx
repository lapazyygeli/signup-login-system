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
      <td className="pr-6 py-2">{name}</td>
      <td className="pr-6 py-2">{password}</td>
      <td className="pr-6 py-2">{passwordConfirmed}</td>
      <td className="pr-6 py-2">
        <button
          className="bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 rounded-md px-4 py-1 text-sm font-medium transition-all duration-200"
          onClick={() => dispatch(deleteUserAsync(id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
