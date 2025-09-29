import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HeaderDashed from "../components/HeaderDashed"; // Optional if you want to keep it
import { onAuthStateChanged } from "firebase/auth"; // Import the auth state change listener

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); 
  const [messageType, setMessageType] = useState(""); 
  const navigate = useNavigate();

  // Handle user redirection if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to home page if already logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessageType("success");
      setStatusMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); 
      }, 2000); 
    } catch (error) {
      setMessageType("error");
      setStatusMessage("Login failed. Please check your credentials.");
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setMessageType("success");
      setStatusMessage("Google Sign-In successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      setMessageType("error");
      setStatusMessage("Google Sign-In failed. Please try again.");
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="Login-Page text-center sec-padd"
    >
      <div className="container">
        {/* Logo Section */}
        <div className="logo-container mb-4">
          <img
            src="https://user-images.githubusercontent.com/7346165/68545613-a48ad480-0409-11ea-8319-6f2364a0eed5.png"
            alt="CICT Collectives Logo"
            className="logo-img"
            style={{ width: '200px', height: 'auto' }} // Adjust size here
          />
          <h2 className="mt-3" style={{ color: 'black' }}>Login to <span style={{ color: '#e26821' }}>CICT Collectives</span></h2> 
        </div>

        {statusMessage && (
          <div
            className={`status-message ${
              messageType === "success" ? "bg-success" : "bg-danger"
            } text-white p-3 mb-4 rounded`}
          >
            {statusMessage}
          </div>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-1 d-flex flex-column gap-3 align-items-center border border-2 p-4">
              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="email" className="mb-2 fs-4">
                  Email:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="email"
                  type="text"
                  id="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>
              <div className="d-flex flex-column align-items-start w-100">
                <label
                  htmlFor="password"
                  className="mb-2 fs-4 w-100 d-flex justify-content-between"
                >
                  Password:{" "}
                  <span
                    className={`cursor c-gray ${showPassword && "active"}`}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    show
                  </span>
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>
              <button
                className="btn bg-black py-2 px-4 rounded c-white fs-5"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>

        <button
          className="btn mt-0 py-2 px-4 rounded"
          onClick={handleGoogleSignIn}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white", 
            color: "black", 
            border: "2px solid black", 
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
            margin: "0 auto",
            width: "fit-content",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "black"; 
            e.target.style.color = "white"; 
            e.target.style.borderColor = "white"; 
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "white"; 
            e.target.style.color = "black"; 
            e.target.style.borderColor = "black"; 
          }}
        >
          <img
            src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
            alt="Google Logo"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Sign in with Google
        </button>

        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/register")}
              style={{ textDecoration: "underline" }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
