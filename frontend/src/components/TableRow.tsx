interface Props {
  id: string;
  name: string;
  password: string;
  passwordConfirmed: string;
  deleteData: (id: string) => void
}

const TableRow = ({ id, name, password, passwordConfirmed, deleteData }: Props) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{password}</td>
      <td>{passwordConfirmed}</td>
      <td>
        <button onClick={() => deleteData(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
