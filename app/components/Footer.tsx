// components/Footer.tsx
import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link href="/termos" className="footer-link">
            Termos de Uso
          </Link>
          <Link href="/politicas" className="footer-link">
            Políticas de Privacidade
          </Link>
          <Link href="/sobre" className="footer-link">
            Sobre
          </Link>
        </div>
        <div className="footer-social"></div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} wzapp.click. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
