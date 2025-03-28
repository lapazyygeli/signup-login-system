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
    const newData = {
      name: formData.name,
      password: formData.password,
      passwordConfirmed: formData.passwordConfirmed,
    };
    const sendToServer = async () => {
      const url = "http://localhost:9000/users/add";
      try {
        const response: Response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Response not okay!");
        }
        const responseJsonNewData = await response.json();
        console.log(responseJsonNewData.message);
        setUserdata((prev) => [...prev, responseJsonNewData.data]);
      } catch (err) {
        console.log(err);
      }
    };
    sendToServer();
  };

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
    setUserdata((prev) => prev.filter((data) => data._id !== id));
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
