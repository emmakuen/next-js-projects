import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchJson } from "../lib/api";

const NavBar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const retrievedUser = await fetchJson("/api/user");
        setUser(retrievedUser);
      } catch (err) {
        // not signed in
      }
    })();
  }, []);

  return (
    <nav className="px-2 py-1 text-sm lg:text-base">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
