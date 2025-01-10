import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/">
          <div className="logo-container">
            <Image
              src="https://i.imgur.com/2L7C7zH.png"
              alt="Logo da Empresa"
              fill
              className="logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
