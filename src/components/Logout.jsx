import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const handleLogout = () => {
  signOut(auth)
    .then(() => alert("Logged out successfully!"))
    .catch((error) => alert(error.message));
};

return <button onClick={handleLogout}>Logout</button>;