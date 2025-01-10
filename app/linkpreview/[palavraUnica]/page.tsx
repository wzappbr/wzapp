"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoCopyOutline } from "react-icons/io5";
import "../../styles/App.css";

export default function LinkPreviewPage() {
  const params = useParams();
  const palavraUnica = params.palavraUnica as string;
  const [dados, setDados] = useState<any>(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const router = useRouter();

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
    setLinkCopiado(true);
    setTimeout(() => {
      setLinkCopiado(false);
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
            <IoCopyOutline />
          </button>
          {linkCopiado && <span className="copy-message">Copiado!</span>}
          <button
            className="generate-button"
            onClick={() => {
              router.push("/");
            }}
            style={{
              backgroundColor: "#25D366",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            Gerar novamente
          </button>
        </p>
      </div>
    </div>
  );
}
