import { useNavigate } from "react-router-dom";

export default function UserAccountInfo({ onEditButton, user }) {
  const navigate = useNavigate();

  function formatDate(date) {
    return date.slice(0, 10);
  }

  return (
    <div className="userAccountInfo">
      <label>
        Name:
        <input type="text" value={user.name} disabled />
      </label>
      <label>
        Email:
        <input type="text" value={user.email} disabled />
      </label>
      <label>
        Username:
        <input type="text" value={user.username} disabled />
      </label>
      <label>
        Password:
        <input type="text" value={user.password} disabled />
      </label>
      <label>
        Date of birth:
        <input type="date" value={formatDate(user.dateOfBirth)} disabled />
      </label>
      <button onClick={onEditButton}>Edit Account</button>
      <button onClick={() => navigate("/")}>Log out</button>
    </div>
  );
}
