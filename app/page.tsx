"use client";
import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [empresa, setEmpresa] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [numero, setNumero] = useState("");
  const [link, setLink] = useState("");
  const [linkExiste, setLinkExiste] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [domain, setDomain] = useState("");
  const router = useRouter();

  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const handleLinkChange = async (e: any) => {
    const novoLink = e.target.value;
    setLink(novoLink);

    if (novoLink) {
      const response = await fetch(`/api?palavraUnica=${novoLink}`);
      if (response.ok) {
        const data = await response.json();
        setLinkExiste(true);
      } else {
        if (response.status === 404) {
          setLinkExiste(false);
        } else {
          console.error("Erro ao verificar o link.");
          setLinkExiste(true);
        }
      }
    } else {
      setLinkExiste(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    console.log("HomePage - Enviando dados:", {
      empresa,
      mensagem,
      numero,
      palavraUnica: link,
    });

    if (!numero.match(/^\d{10,11}$/)) {
      alert(
        "Por favor, insira um número de WhatsApp válido com 10 ou 11 dígitos."
      );
      return;
    }
    if (!link) {
      alert("Por favor, insira uma palavra única para o link.");
      return;
    }

    if (linkExiste) {
      alert("O link já está em uso. Por favor, escolha outro.");
      return;
    }

    setIsButtonDisabled(true);

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empresa,
        mensagem,
        numero,
        tipoLink: "aleatorio",
        palavraUnica: link,
      }),
    });

    if (response.ok) {
      console.log(
        "HomePage - Dados enviados com sucesso, redirecionando para:",
        `/linkpreview/${link}`
      );
      router.push(`/linkpreview/${link}`);
    } else {
      const data = await response.json();
      console.error("HomePage - Erro ao enviar dados:", data.error);
      setLinkExiste(true);
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="title">Gerador de Link WhatsApp</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome da Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          required
          className="input"
          autoFocus
        />
        <textarea
          placeholder="Mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
          className="textarea"
        />
        <input
          type="text"
          placeholder="Número do WhatsApp (DDD + Número)"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="input"
        />
        <div className="link-input-container">
          <span className="domain-prefix">{domain}/</span>
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={handleLinkChange}
            required
            className="input link-input"
          />
        </div>
        {linkExiste && (
          <p className="error-message">
            O link já está em uso. Por favor, escolha outro.
          </p>
        )}
        <button
          type="submit"
          className="button"
          disabled={linkExiste || isButtonDisabled}
        >
          Gerar Link Curto
        </button>
      </form>
    </div>
  );
}
