import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [emailId, setEmailID] = useState("shalini@gmail.com");
  const [password, setPassword] = useState("Shalini@080607");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleAuth = async () => {
  try {
    const payload = isLogin
      ? { emailId, password }
      : { firstName, lastName, emailId, password };

    const url = isLogin
      ? `${BASE_URL}/login`
      : `${BASE_URL}/signup`;

    const res = await axios.post(url, payload, {
      withCredentials: true,
    });

    if (isLogin) {
      dispatch(addUser(res.data));
      toast.success("Login successful 🎉");
      navigate("/");
    } else {
      dispatch(addUser(res.data)); // user is created
      toast.success("Signup successful 🎉 Complete your profile");
      navigate("/profile");
    }
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        (isLogin ? "Login failed ❌" : "Signup failed ❌")
    );
  }
};
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  First Name
                </legend>
                <input
                  type="text"
                  value={firstName}
                  className="input w-full my-2"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </fieldset>

              <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend">
                  Last Name
                </legend>
                <input
                  type="text"
                  value={lastName}
                  className="input w-full my-2"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">
              Email ID
            </legend>
            <input
              type="email"
              value={emailId}
              className="input w-full my-2"
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="Enter email"
            />
          </fieldset>
          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">
              Password
            </legend>
            <input
              type="password"
              value={password}
              className="input w-full my-2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </fieldset>
          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full bg-indigo-400"
              onClick={handleAuth}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              className="text-indigo-400 cursor-pointer font-semibold"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
