import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Error from "../components/Error";


export default function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUserId } = useUser();

    async function handleSubmit(e) {
        e.preventDefault();
        const user = await fetch(`/api/login?username=${username}&password=${password}`).then((res) => res.json());
        if (user.message) {
          setError(user.message);
          return;
        }
        setUserId(user._id);
        navigate(`/u/wishlist/${user._id}`);
    }

    return (
    <>
      {error && <Error errorMessage={error} />}
      <div className="login">
        <form action="submit" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>Dont have an account yet?
        <Link to="/register">
        <button>Sign up</button>
        </Link>
      </div>
    </>
  )
}
