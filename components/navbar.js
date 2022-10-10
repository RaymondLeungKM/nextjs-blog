import Link from "next/link";
import { useCallback, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useResizeDetector } from "react-resize-detector";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/slices/authSlice";
import { useRouter } from "next/router";
import {
  Button,
  useColorMode,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
  Flex,
  Box
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

  //  Logout Toast Related
  const router = useRouter();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    toast({
      title: 'Logout Successfully',
      description: "You have logged out successfully!",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right'
    });
    onClose();
  };

  // get the jwt state from store
  const jwt = useSelector((state) => state.auth.jwt);

  const closeMobileMenuHandler = () => {
    setShowMobileMenu(false);
    window.sessionStorage.setItem("showMobileMenu", false);
  };

  const onResize = useCallback(() => {
    if (
      (width <= 576 &&
        showMobileMenu &&
        window.sessionStorage.getItem("showMobileMenu") &&
        window.sessionStorage.getItem("showMobileMenu") != "true") ||
      (width <= 576 &&
        showMobileMenu &&
        !window.sessionStorage.getItem("showMobileMenu"))
    ) {
      console.log("set to true!");
      window.sessionStorage.setItem("showMobileMenu", true);
    }
    if (width > 576 && showMobileMenu) {
      setShowMobileMenu(false);
    }
    if (
      width <= 576 &&
      window.sessionStorage.getItem("showMobileMenu") == "true" &&
      !showMobileMenu
    ) {
      setShowMobileMenu(true);
    }
  });
  const { width, height, ref } = useResizeDetector({ onResize });

  document.body.style.overflow = showMobileMenu ? "hidden" : "unset";

  // Remove existing sessionStorage cache on first load
  useEffect(() => {
    console.log("shd run once only!!");
    if (
      window.sessionStorage.getItem("showMobileMenu") &&
      window.sessionStorage.getItem("showMobileMenu") == "true"
    ) {
      console.log("remove cached show mobile menu");
      window.sessionStorage.removeItem("showMobileMenu");
    }
  }, []);

  //  Mobile Menu Related
  useEffect(() => {
    if (
      !showMobileMenu &&
      window.sessionStorage.getItem("showMobileMenu") &&
      window.sessionStorage.getItem("showMobileMenu") != "true"
    ) {
      console.log("set session Storage mobile menu = false");
      window.sessionStorage.setItem("showMobileMenu", false);
    }
  }, [showMobileMenu]);

  //  Logout refresh!
  useEffect(() => {
    if (jwt != "") {
      console.log("login done!");
    } else {
      console.log("logout done!");
    }
    console.log("jwt=", jwt);
  }, [jwt]);

  return (
    <Flex
      ref={ref}
      alignItems="center"
      className="navbar h-[4vh] w-full px-8 py-4 bg-blue-600 dark:bg-teal-800 text-white text-xl font-bold"
    >
      <Box className="logo grid place-items-center">BLOG</Box>
      <Flex className="nav-menu-pc flex-1 pl-4 hidden items-center sm:flex">
        <ul className="flex flex-1 gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-me">About Me</Link>
          </li>
        </ul>
        <ul className="rightMenu right-0 flex gap-4 items-center">
          <li className="h-7">
            <Button size="xs" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </li>
          {!jwt ? (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/createPost">Create Post</Link>
              </li>
              <li>
                <Link href="/user">My Profile</Link>
              </li>
              <li onClick={onOpen}>Logout</li>
            </>
          )}
        </ul>
      </Flex>
      <div className="nav-menu-m flex-1 flex sm:hidden justify-end">
        <svg
          className="cursor-pointer"
          onClick={() => setShowMobileMenu(true)}
          fill="#fff"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
            fillRule="nonzero"
          />
        </svg>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="mobile-menu h-screen w-screen bg-zinc-400 dark:bg-slate-800 absolute left-0 top-0 z-10"
              initial={{ opacity: 0, left: "-100vw" }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: "-100vw" }}
            >
              <svg
                onClick={() => closeMobileMenuHandler()}
                className="absolute right-4 top-4"
                stroke="white"
                strokeWidth="3"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
              </svg>
              <div className="logo text-center mt-8">BLOG</div>
              <ul className="grid place-items-center h-[95vh]">
                <li onClick={() => closeMobileMenuHandler()}>
                  <Link href="/">Home</Link>
                </li>
                <li onClick={() => closeMobileMenuHandler()}>
                  <Link href="/about-me">About Me</Link>
                </li>
                <li className="h-7">
                  <Button size="xs" onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                  </Button>
                </li>
                {!jwt ? (
                  <>
                    <li onClick={() => closeMobileMenuHandler()}>
                      <Link href="/login">Login</Link>
                    </li>
                    <li onClick={() => closeMobileMenuHandler()}>
                      <Link href="/signup">Signup</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={() => closeMobileMenuHandler()}>
                      <Link href="/createPost">Create Post</Link>
                    </li>
                    <li onClick={() => closeMobileMenuHandler()}>
                      <Link href="/user">My Profile</Link>
                    </li>
                    <li onClick={onOpen}>Logout</li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Logout</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to proceed to logout?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={logoutHandler}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
