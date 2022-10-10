import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authActions } from "../store/slices/authSlice";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const registerHandler = (e) => {
    console.log("in register handler");
    e.preventDefault();
    const registerApiUrl = "http://localhost:1337/api/auth/local/register";

    const params = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(registerApiUrl, params)
      .then((res) => {
        if (res.status == "200" && res.data.jwt) {
          dispatch(authActions.login(res.data));
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      layout
      className="login-box grid place-items-center h-[96vh]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <form
        className="login-form h-96 w-9/12 shadow-2xl border-2 px-12 py-12 rounded-lg grid place-items-center"
        onSubmit={registerHandler}
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            className="border-2 outline-0"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-2 outline-0"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            className="border-2 outline-0"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg h-12 w-24"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
}
