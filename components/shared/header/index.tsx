import { APP_Name } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="./images/logo.svg"
              alt={`${APP_Name} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold ml-3 text-2xl">{APP_Name}</span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
