import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="px-2 py-1 text-sm lg:text-base">
      <ul className="flex justify-between">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
