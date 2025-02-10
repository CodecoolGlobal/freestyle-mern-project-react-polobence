import React from "react";

function EditAccountInformation({ user }) {
      const [newName, setNewName] = useState(user.name);
      const [newEmail, setNewEmail] = useState(user.email);
      const [newUsername, setNewUsername] = useState(user.username);
      const [newPassword, setNewPassword] = useState(user.password);

      async function handleSubmit(params) {
    //write the save change
        
      }

  return (
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
  );
}

export default EditAccountInformation;
