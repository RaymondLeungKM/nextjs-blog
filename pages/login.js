import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const loginHandler = (e) => {
    console.log(e);
    e.preventDefault();

    const loginApiUrl = "http://localhost:1337/api/auth/local";

    axios
      .post(loginApiUrl, {
        identifier: email,
        password: password,
      })
      .then((res) => {
        if (res.status == "200" && res.data.jwt) {
          // Add a toast message for notifying the user of successful login
          toast({
            title: 'Login Successfully',
            description: "You have logged in successfully!",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
          });
          const decodedToken = jwtDecode(res.data.jwt);
          localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
          dispatch(authActions.login(res.data));
          router.push("/");
        }
      });
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
        onSubmit={loginHandler}
      >
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
          Login
        </button>
      </form>
    </motion.div>
  );
}
