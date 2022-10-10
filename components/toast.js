import { AnimatePresence, motion } from "framer-motion";
import HTMLReactParser from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastActions } from "../store/slices/toastSlice";

export default function Toast() {
  const show = useSelector((state) => state.toast.show);
  const content = useSelector((state) => state.toast.content);

  const dispatch = useDispatch();

  const closeToast = (e) => {
    e.stopPropagation();
    if (e.target.className.includes("toast-stage")) {
      dispatch(toastActions.hideToast());
    }
  };

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "unset";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={closeToast}
          className="toast-stage w-screen h-screen bg-[rgba(0,0,0,50%)] fixed left-0 top-0 grid place-items-center z-[999]"
          layout
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
        >
          <div className="toast-container w-3/4 h-3/4 bg-white rounded-md p-4 text-black">
            {HTMLReactParser(content)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
