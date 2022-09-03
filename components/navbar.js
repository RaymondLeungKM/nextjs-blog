import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar flex h-[4vh] w-full px-8 py-4 bg-blue-600 text-white text-xl font-bold">
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
