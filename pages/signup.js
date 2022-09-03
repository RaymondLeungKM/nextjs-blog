import { motion } from "framer-motion";

export default function Signup() {
    return (
    <motion.div
        className="signup-box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
    >
        <form className="signup-form">
            <label htmlFor="account_no">Account No:</label>
            <input type="text" id="account_no" name="account_no" required />

            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" required />

        </form>
    </motion.div>
    );
}