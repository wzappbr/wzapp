"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "../styles/App.css";

export default function RedirecionarPage() {
  const params = useParams();
  const palavraUnica = params.palavraUnica as string;
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (palavraUnica) {
        const response = await fetch(`/api?palavraUnica=${palavraUnica}`);
        if (response.ok) {
          const data = await response.json();
          setDados(data);
        }
      }
    };
    fetchData();
  }, [palavraUnica]);

  const gerarLinkWhatsApp = () => {
    if (!dados) return "";
    let link = `https://api.whatsapp.com/send?phone=${dados.numero}&text=${encodeURIComponent(dados.mensagem)}`;
    if (dados.tipoLink === "empresa" && dados.empresa) {
      link += `&source=${encodeURIComponent(dados.empresa)}`;
    }
    return link;
  };

  const handleIniciarConversa = () => {
    window.location.href = gerarLinkWhatsApp();
  };

  if (!dados) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Deseja falar com: {dados.empresa}</h1>
      <p className="message">Mensagem: {dados.mensagem}</p>
      <button onClick={handleIniciarConversa} className="button">
        Iniciar Conversa
      </button>
    </div>
  );
}
