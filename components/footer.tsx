import { APP_Name } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} {APP_Name}. All Rights reserved.{" "}
      </div>
    </footer>
  );
};

export default Footer;
