import React from "react";
import Link from "next/link";

const NavLink = ({ href, name, color, hoverColor }) => {
  return (
    <>
      <Link href={href} passHref>
        <a>{name}</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
          color: ${color};
          font-weight: 600;
          font-size: 18px;
        }

        a:hover {
          color: ${hoverColor};
        }
      `}</style>
    </>
  );
};

export default NavLink;
