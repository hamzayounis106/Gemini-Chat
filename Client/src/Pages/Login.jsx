import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
function Login() {
  const server = import.meta.env.VITE_SERVER_URL;
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const handelLogin = async (googleData) => {
    const userData = jwtDecode(googleData);
    console.log(userData);
    try {
      const res = await axios.post(
        `${server}/api/authRoutes/auth/google/callback`,
        {
          credential: googleData,
        },
        {
          withCredentials: true,
        }
      );

      if (res) {
        console.log(res.data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute flex items-center justify-between top-5 right-5">
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
