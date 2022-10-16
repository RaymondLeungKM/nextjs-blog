import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice";
import jwtDecode from "jwt-decode";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const toast = useToast();

  const emailValidation = (res) => {
    console.log("in email validation!");
    if (email === '') {
      setEmailInvalid(true);
      setEmailErrorMessage("Email is required!");
      return false;
    } else {
      setEmailInvalid(false);
      setEmailErrorMessage("");
      return true;
    }
  }

  const passwordValidation = () => {
    console.log("in password validation!");
    if (password === '') {
      setPasswordInvalid(true);
      setPasswordErrorMessage("Password is required!");
      return false;
    } else {
      setPasswordInvalid(false);
      setPasswordErrorMessage("");
      return true;
    }
  }

  const loginHandler = (e) => {
    e.preventDefault();

    // Form validation, need to find a better way to run all the validation;
    let validationResult = emailValidation();
    validationResult = passwordValidation();
    if (!validationResult) return;

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
            title: "Login Successfully",
            description: "You have logged in successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
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
        className="login-form w-9/12 shadow-2xl border-2 px-12 py-12 rounded-lg grid place-items-center"
        onSubmit={loginHandler}
      >
        <Heading>Login</Heading>
        <FormControl isInvalid={emailInvalid}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="text"
            id="email"
            name="email"
            className="border-2 outline-0"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={passwordInvalid}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="border-2 outline-0"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            
          </InputGroup>
          <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" mt="4">
          Login
        </Button>
      </form>
    </motion.div>
  );
}
