import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

    const login = (e) => {
        e.preventDefault();
        console.log("in login function!");
        router.push("/");
    }
    return (
    <motion.div
        className="login-box grid place-items-center h-[96vh]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
    >
        <form className="login-form h-96 w-9/12 shadow-2xl border-2 px-12 py-12 rounded-lg grid place-items-center" onSubmit={login}>

            <div className="flex flex-col">
                <label htmlFor="account_no">Account No:</label>
                <input type="text" id="account_no" name="account_no" className="border-2 outline-0"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" className="border-2 outline-0"/>
            </div>

            <button type="submit" className="bg-blue-600 text-white rounded-lg h-12 w-24">Login</button>
        </form>
    </motion.div>
    );
}