import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <ThemeSwitch />
      </nav>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        ul {
          list-style-type: none;
        }
        li {
          display: inline;
        }
        li:not(:first-child) {
          margin-left: 0.75rem;
        }
      `}</style>
    </header>
  );
};

export default NavBar;
