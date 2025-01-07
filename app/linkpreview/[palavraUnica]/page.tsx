"use client"; // Certifique-se de que esta linha está no topo

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import correto para App Router
import { IoCopyOutline } from "react-icons/io5";
import "../../styles/App.css";

export default function LinkPreviewPage() {
  const params = useParams();
  const palavraUnica = params.palavraUnica as string;
  const [dados, setDados] = useState<any>(null);
  const [linkCopiado, setLinkCopiado] = useState(false); // Estado para controlar a mensagem de link copiado
  const router = useRouter(); // Renomeei para 'router' para clareza

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

  const gerarLinkRedirecionamento = () => {
    return `${window.location.origin}/${palavraUnica}`;
  };

  const handleCopiarLink = () => {
    navigator.clipboard.writeText(gerarLinkRedirecionamento());
    setLinkCopiado(true); // Define o estado como copiado
    setTimeout(() => {
      setLinkCopiado(false); // Reseta o estado após 2 segundos
    }, 2000);
  };

  if (!dados) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Seu link foi gerado com sucesso!</h1>
      <div className="info">
        <p>
          <strong>Mensagem:</strong> {dados.mensagem}
        </p>
        <p className="link-container">
          <strong>Link:</strong>
          <span className="link-text">{gerarLinkRedirecionamento()}</span>
          <button className="copy-button" onClick={handleCopiarLink}>
            <IoCopyOutline /> {/* Ícone de cópia */}
          </button>
          {linkCopiado && <span className="copy-message">Copiado!</span>}
          <button
            className="generate-button"
            onClick={() => {
              router.push("/"); // Uso correto do router.push no App Router
            }}
          >
            Gerar novamente
          </button>
        </p>
      </div>
    </div>
  );
}
