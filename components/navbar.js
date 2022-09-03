import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="navbar flex h-[4vh] w-full px-8 py-4 bg-blue-600 dark:bg-teal-800 text-white text-xl font-bold">
      <div className="logo">BLOG</div>
      <div className="nav-menu flex-1 pl-4 flex ">
        <ul className="flex flex-1 gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-me">About Me</Link>
          </li>
        </ul>
        <ul className="rightMenu right-0 flex gap-4">
          <li>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme == 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
            </button>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
