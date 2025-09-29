import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore
import { useNavigate } from "react-router-dom"; // Optional, to redirect if not logged in

// Optional: You can add a user icon here as a fallback
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Logout icon

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState(""); // State to track logout message
  const auth = getAuth(); // Firebase Authentication instance
  const db = getFirestore(); // Firestore instance
  const navigate = useNavigate(); // Navigation to redirect

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser; // Get the current authenticated user
      if (!currentUser) {
        // If no user is logged in, redirect to the login page
        navigate("/login");
        return;
      }

      // Fetch additional user data from Firestore (if needed)
      const userRef = doc(db, "users", currentUser.uid); // Assuming you have a "users" collection in Firestore
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Set the user data
        setUserData({
          ...currentUser,
          ...userDoc.data(), // Combine Firestore data with Firebase Auth data
        });
      } else {
        // If no user data exists in Firestore, set Firebase Auth data only
        setUserData(currentUser);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [auth, db, navigate]);

  if (loading) {
    return   <h1 className="text-center mb-4">Loading...</h1>
    ; // Optional, to show while loading user data
  }

  if (!userData) {
    return  <h1 className="text-center mb-4">No user data found. Please log in.</h1>;
  }

  // Logout function
  const handleLogout = async () => {
    await auth.signOut();
    setLogoutMessage("You have successfully logged out!"); // Set logout message
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after 2 seconds
    }, 2000);
  };

  return (
    <div className="profile-page container mt-5">
      <h1 className="text-center mb-4">User Profile</h1>

      {logoutMessage && (
        <div className="alert alert-success text-center" role="alert">
          {logoutMessage}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          {/* Profile Picture */}
          <div className="profile-pic-container">
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="rounded-circle img-fluid mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle
                className="mb-3"
                size={150}
                color="#6c757d"
              />
            )}
          </div>

          <h2 className="mt-3">{userData.fullName || "No Display Name"}</h2>
          <p>{userData.email}</p>
        </div>

        <div className="col-md-6">
          {/* User Information */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Information</h5>
              <p><strong>Full Name:</strong> {userData.fullName || "Not Provided"}</p>
              <p><strong>Address:</strong> {userData.address || "Not Provided"}</p>
              <p><strong>Date of Birth:</strong> {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : "Not Provided"}</p>
              <p><strong>Phone Number:</strong> {userData.phoneNumber || "Not Provided"}</p>

              {/* Logout Button with Icon */}
              <button
                onClick={handleLogout}
                className="btn btn-dark mt-4"
                style={{ textAlign: "left", paddingLeft: "15px", display: "flex", alignItems: "center" }}
              >
                <span>Logout</span>
                <FaSignOutAlt className="ms-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
