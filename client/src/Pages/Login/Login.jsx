import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import Error from "../../components/Error/Error";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState(localStorage.getItem("username") ?? "");
  const [password, setPassword] = useState(localStorage.getItem("password") ?? "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserId } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetch(`/api/login?username=${username}&password=${password}`).then((res) =>
      res.json()
    );
    if (user.message) {
      setError(user.message);
      return;
    }
    setUserId(user._id);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);
    navigate(`/u/wishlist/${user._id}`);
  }

  return (
    <div className="login-page">
      {error && <Error errorMessage={error} />}
      <div className="login">
        <form action="submit" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="sign-up">
        <p>Dont have an account yet?</p>
        <Link className="link" to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  );
}
