import React from "react";
import Link from "next/link";

const NavBar = () => {
  const user = { name: "Alice" };
  return (
    <nav className="px-2 py-1 text-sm lg:text-base">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {!user ? (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        ) : (
          <>
            <li>{user.name}</li>
            <li>
              <button>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
