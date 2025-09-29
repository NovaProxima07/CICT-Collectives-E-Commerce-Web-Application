import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { auth, db } from "../firebase"; // Import Firebase authentication and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase function for registration
import { useNavigate } from "react-router-dom"; // For navigation
import HeaderDashed from "../components/HeaderDashed"; // Custom header component
import { doc, setDoc } from "firebase/firestore"; // Firestore functions for saving user data

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // Feedback messages
  const [messageType, setMessageType] = useState(""); // Style success/error
  const navigate = useNavigate();

  // Validation schema for form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required").nullable(),
  });

  const handleSubmit = async (values) => {
    const { email, password, fullName, phoneNumber, address, dateOfBirth } = values;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add user details to Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        fullName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        createdAt: new Date(),
      });

      setMessageType("success");
      setStatusMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      setMessageType("error");
      setStatusMessage(`Registration failed. Error: ${error.message}`);
      console.error("Error during registration:", error.message);
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
        <HeaderDashed head1="Sign" head2="UP" />

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
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            dateOfBirth: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-5 d-flex flex-column gap-5 align-items-center border border-2 p-4">
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
                <label htmlFor="password" className="mb-2 fs-4">
                  Password:
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

              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="confirmPassword" className="mb-2 fs-4">
                  Confirm Password:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Your Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="fullName" className="mb-2 fs-4">
                  Full Name:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="fullName"
                  type="text"
                  id="fullName"
                  placeholder="Enter Your Full Name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="phoneNumber" className="mb-2 fs-4">
                  Phone Number:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="phoneNumber"
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter Your Phone Number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="address" className="mb-2 fs-4">
                  Address:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="address"
                  type="text"
                  id="address"
                  placeholder="Enter Your Address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              <div className="d-flex flex-column align-items-start w-100">
                <label htmlFor="dateOfBirth" className="mb-2 fs-4">
                  Date of Birth:
                </label>
                <Field
                  className="p-3 py-203 outline-0 w-100 border-gray border-05"
                  name="dateOfBirth"
                  type="date"
                  id="dateOfBirth"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              <button
                className="btn bg-black py-2 px-4 rounded c-white fs-5"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
              style={{ textDecoration: "underline" }}
            >
              Log in here
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
