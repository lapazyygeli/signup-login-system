import { useState } from "react";
import Form from "./components/Form.tsx";
import TableRow from "./components/TableRow.tsx";
import { FormData } from "./components/Form.tsx";

interface UserData {
  _id: string;
  name: string;
  password: string;
  passwordConfirmed: string;
}

function App() {
  const [userdata, setUserdata] = useState<UserData[]>([]);

  const addData = (formData: FormData) => {
    
  };

  const deleteData = async (id: string) => {
    
  };

  return (
    <>
      <Form addData={addData} />
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
          {userdata.map((prev) => (
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
}

export default App;
