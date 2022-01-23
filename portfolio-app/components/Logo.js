import Image from "next/image";
import Link from "next/link";
import { routes } from "../utils/routes";

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
          position: absolute;
          top: -5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Logo;
