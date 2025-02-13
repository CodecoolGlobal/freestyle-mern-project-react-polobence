import "./UserAccountInfo.css";
import { useNavigate } from "react-router-dom";

export default function UserAccountInfo({ onEditButton, user }) {
  const navigate = useNavigate();

  function formatDate(date) {
    return date.slice(0, 10);
  }

  return (
    <div className="userAccountInfo">
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Username: {user.username}</h4>
      <h4>Password: ●●●●●●●●</h4>
      <h4>Date of birth: {formatDate(user.dateOfBirth)}</h4>
      <button onClick={onEditButton}>Edit Account</button>
      <button onClick={() => navigate("/")}>Log out</button>
    </div>
  );
}
