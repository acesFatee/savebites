import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";
import { createUser } from "../api/createUser";

const AuthForm = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isNewUser = result?._tokenResponse?.isNewUser
      if(isNewUser){
        const user = {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
        }
        const firebaseUser = await createUser(user)
        setUser({...firebaseUser, isLoggedIn: true})
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <div className="mt-4">
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center bg-gray-100 text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.6 20.4H42V20H24v8.5h11.3C33.9 33.8 29.6 36 24 36c-7.1 0-13-5.8-13-13s5.9-13 13-13c3.1 0 5.9 1.1 8.1 3l6.4-6.4C34.7 3.8 29.7 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 20.4-8 21.8-18.6.1-.3.2-.7.2-1.1v-5.9h-2.4z"
              />
              <path
                fill="#e53935"
                d="M6.3 14.1l6.6 4.8C15.4 14 19.4 12 24 12c3.1 0 5.9 1.1 8.1 3l6.4-6.4C34.7 3.8 29.7 2 24 2 16.5 2 10 6 6.3 14.1z"
              />
              <path
                fill="#4caf50"
                d="M24 44c5.3 0 10.1-1.9 13.9-5.2l-6.4-5.3C29.8 34.7 27 36 24 36c-5.6 0-9.9-2.3-13.3-5.9l-6.7 5.1C9.9 41.8 16.7 44 24 44z"
              />
              <path
                fill="#1565c0"
                d="M43.6 20.4H42V20H24v8.5h11.3c-1.9 4.4-6.1 7.5-11.3 7.5-5.6 0-10.4-3.4-12.5-8.2L6.3 33.9C9.9 41.8 16.7 44 24 44c11 0 20.4-8 21.8-18.6.1-.3.2-.7.2-1.1v-5.9h-2.4z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
