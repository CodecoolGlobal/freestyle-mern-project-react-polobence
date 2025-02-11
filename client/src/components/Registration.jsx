import { useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: name,
      username: username,
      password: password,
      email: email,
      dateOfBirth: dateOfBirth,
    };
    const createdUser = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(await createdUser.json());
  }

  return (
    <div className="registration">
      <form action="submit" onSubmit={handleSubmit}>
        <label>
          Please enter your name:
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Please enter your email:
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Please enter your username:
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Please enter your password:
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Please enter your date of birth:
          <input type="date" onChange={(e) => setdateOfBirth(e.target.value)} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Registration;
