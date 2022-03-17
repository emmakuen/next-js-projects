import Image from "next/image";
import Link from "next/link";
import { routes } from "../constants/routes";

const Logo = () => {
  return (
    <div className="logo">
      <Link href={routes[0].href} passHref={true}>
        <a>
          <Image
            src="/images/logo.png"
            alt="emmaku logo"
            width={70}
            height={53}
          />
        </a>
      </Link>
      <style jsx>{`
        .logo {
          cursor: pointer;
          margin-top: -5px;
        }
      `}</style>
    </div>
  );
};

export default Logo;
