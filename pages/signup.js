import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authActions } from "../store/slices/authSlice";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const usernameValidation = (res) => {
    console.log("in username validation!");
    if (username === '') {
      setUsernameInvalid(true);
      setUsernameErrorMessage("Username is required!");
      return false;
    } else {
      setUsernameInvalid(false);
      setUsernameErrorMessage("");
      return true;
    }
  }

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

  const registerHandler = (e) => {
    console.log("in register handler");
    e.preventDefault();

    // Form validation, need to find a better way to run all the validation;
    let validationResult = usernameValidation();
    validationResult = emailValidation();
    validationResult = passwordValidation();
    if (!validationResult) return;

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
        className="login-form w-9/12 shadow-2xl border-2 px-12 py-12 rounded-lg grid place-items-center"
        onSubmit={registerHandler}
      >
        <Heading>Sign Up</Heading>
        <FormControl isInvalid={usernameInvalid}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            className="border-2 outline-0"
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={emailInvalid}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
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
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
