import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

function EditAccountInformation({ user }) {
      const [newName, setNewName] = useState(user.name);
      const [newEmail, setNewEmail] = useState(user.email);
      const [newUsername, setNewUsername] = useState(user.username);
      const [newPassword, setNewPassword] = useState(user.password);
      const [error, setError] = useState(null);
      const navigate = useNavigate();

      async function handleSubmit(e) {
        e.preventDefault();
        const changedUser = {
          name: newName,
          username: newUsername,
          password: newPassword,
          email: newEmail
        }
        const updatedUser = await fetch(`/api/user/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(changedUser)
        }).then(res => res.json());
        if(updatedUser.message){
          setError(updatedUser.message)
          return;
        }
        navigate(`/u/account/${updatedUser._id}`)
      }

  return (
    <>
    {error && <Error errorMessage={error}/>}
    <div className="editAccount">
      <form action="submit" onSubmit={handleSubmit}>
        <label>
          Please enter your name:
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <label>
          Please enter your email:
          <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </label>
        <label>
          Please enter your username:
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <label>
          Please enter your password:
          <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button type="submit">Update Account</button>
        <label>
            Date of birth:
            {user.dateOfBirth}
        </label>
      </form>
    </div>
    </>
  );
}

export default EditAccountInformation;
