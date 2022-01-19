import React from "react";
import Link from "next/link";

const NavLink = ({ href, name, color }) => {
  return (
    <>
      <Link href={href}>
        <a>{name}</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
          color: ${color};
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default NavLink;
