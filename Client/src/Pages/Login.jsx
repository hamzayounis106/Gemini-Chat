import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
function Login() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const handelLogin = async (googleData) => {
    const userData = jwtDecode(googleData);
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/authRoutes/auth/google/callback",
        {
          credential: googleData,
        }
      );

      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[600px] bg-white">
      <button type="button">
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handelLogin(credentialResponse.credential);
            }}
            onError={(error) => {
              console.error(error);
            }}
          />
        </GoogleOAuthProvider>
      </button>
    </div>
  );
}

export default Login;
