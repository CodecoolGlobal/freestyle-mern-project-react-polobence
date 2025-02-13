import "./EditAccountInformation.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import ConfirmDelete from "../ConfirmDelete";

function EditAccountInformation({ handleBackButton, user }) {
      const [newName, setNewName] = useState(user.name);
      const [newEmail, setNewEmail] = useState(user.email);
      const [newUsername, setNewUsername] = useState(user.username);
      const [newPassword, setNewPassword] = useState(user.password);
      const [error, setError] = useState(null);
      const [confirmDelete, setConfirmDelete] = useState(false);
      const navigate = useNavigate();

      function formatDate(date) {
        return date.slice(0, 10);
      }

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
        navigate(`/u/wishlist/${updatedUser._id}`)
      }

      async function handleDelete () {
        const deleted = await fetch(`/api/user/${user._id}`, {
          method: "DELETE"
        })
        console.log(deleted);
        navigate("/");
      }

      function handleCancel () {
        setConfirmDelete(false);
      }

  return (
    <>
    {error && <Error errorMessage={error}/>}
    <div className="editAccount">
      <form action="submit" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label>
            Date of birth:
            <input type="date" value={formatDate(user.dateOfBirth)} disabled/>
        </label>
        <button type="submit">Update Account</button>
      </form>
    </div>
    <div className="deleteAccount">
      <button onClick={() => setConfirmDelete(true)}>DELETE</button>
    </div>
    {confirmDelete && (<ConfirmDelete handleDelete={handleDelete} handleCancel={handleCancel}/>)}

    <button onClick={handleBackButton}>Back</button>
    </>
  );
}

export default EditAccountInformation;
