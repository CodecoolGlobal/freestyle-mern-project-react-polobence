import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAccountInfo from "../components/UserAccountInfo/UserAccountInfo";
import EditAccountInformation from "../components/EditAccountInformation/EditAccountInformation";

export default function Account() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleEditButton = () => {
    setEditing(true);
  }
  const handleBackButton = () => {
    setEditing(false);
  }

  useEffect(() => {
    async function fetchUser () {
        const res = await fetch(`/api/user/${id}`);
        const user  = await res.json();
        setUser(user);
    } 

    fetchUser();
  }, []);

  return (
    <>
    {user && !editing && <UserAccountInfo  onEditButton={handleEditButton} user={user}/>}
    {user && editing && <EditAccountInformation handleBackButton={handleBackButton} user={user}/>}
    </>
  );
}
