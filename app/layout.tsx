// app/layout.tsx
import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Wzapp Click - Gerador de Link Direto para WhatsApp",
  description:
    "Wzapp Click é uma ferramenta gratuita que permite criar links personalizados e curtos para direcionar clientes diretamente para o seu WhatsApp, facilitando a comunicação e impulsionando suas vendas.",
  openGraph: {
    title: "Wzapp Click - Crie Links Diretos para WhatsApp",
    description:
      "Utilize o Wzapp Click para gerar links personalizados e curtos que facilitam o contato com clientes via WhatsApp. Ideal para marketing digital, vendas e comunicação eficiente.",
    url: "https://www.wzapp.click",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Wzapp.Click</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
