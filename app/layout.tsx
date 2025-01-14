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
        <link rel="icon" type="image/png" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PL9LMDK8');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PL9LMDK8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
