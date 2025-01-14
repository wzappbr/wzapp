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

  // Função para aplicar a máscara ao telefone
  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove tudo que não for dígito
    let rawValue = e.target.value.replace(/\D/g, "");

    // Limita para no máximo 11 dígitos
    rawValue = rawValue.substring(0, 11);

    // Aplica a máscara (12) 3 6547-8945
    let maskedValue = "";
    if (rawValue.length > 0) {
      maskedValue = "(" + rawValue.substring(0, 2);
    }
    if (rawValue.length >= 3) {
      maskedValue += ") " + rawValue.substring(2, 3);
    }
    if (rawValue.length >= 4) {
      maskedValue += " " + rawValue.substring(3, 7);
    }
    if (rawValue.length >= 8) {
      maskedValue += "-" + rawValue.substring(7, 11);
    }

    setNumero(maskedValue);
  };

  const handleLinkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoLink = e.target.value;
    setLink(novoLink);

    if (novoLink) {
      const response = await fetch(`/api?palavraUnica=${novoLink}`);
      if (response.ok) {
        await response.json();
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // Remove tudo que não for dígito antes de enviar ao backend
    const numeroSemMascara = numero.replace(/\D/g, "");

    console.log("HomePage - Enviando dados:", {
      empresa,
      mensagem,
      numero: numeroSemMascara,
      palavraUnica: link,
    });

    // Validação de formato do número sem máscara
    if (!numeroSemMascara.match(/^\d{10,11}$/)) {
      alert("Por favor, insira um número de WhatsApp válido com 10 ou 11 dígitos.");
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
        numero: numeroSemMascara, // Enviando sem espaços e símbolos
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
          onChange={handleNumeroChange}
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
