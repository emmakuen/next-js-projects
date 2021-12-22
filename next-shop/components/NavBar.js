import Link from "next/link";
import { useSignOut, useUser } from "../hooks/user";

const NavBar = () => {
  const user = useUser();
  const signout = useSignOut();

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
              <button onClick={signout}>Sign Out</button>
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
