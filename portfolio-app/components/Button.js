import React from "react";
import { routes } from "../constants/routes";
import Link from "next/link";

const Button = ({ text, routename, color, backgroundColor, borderColor }) => {
  const route = routes.filter((route) => route.name === routename)[0];
  return (
    <Link href={route.href} passHref>
      <a>
        <button className="action-button">
          <p>{text}</p>
        </button>

        <style jsx>{`
          .action-button {
            border-radius: 20px;
            width: 168px;
            height: 56px;
            border: 2px ${borderColor} solid;
            background-color: ${backgroundColor};
            margin-top: 30px;
            cursor: pointer;
          }

          .action-button:hover {
            transform: scale(1.05);
            transition: 0.3s ease-in;
          }

          p {
            text-decoration: none;
            color: ${color};
            font-weight: 600;
            font-size: 18px;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Button;
