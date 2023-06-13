import React from "react";

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

export const LoginView = () => {
    return (
      <form>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
};