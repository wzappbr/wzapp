import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/">
          <Image
            src="https://i.imgur.com/2L7C7zH.png"
            alt="Logo da Empresa"
            width={300}
            height={80}
            className="logo"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
