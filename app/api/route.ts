import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const db = createClient({
  url: "libsql://linkpersondatabase-kralluz.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzUyNTAyNjUsImlkIjoiZmJjNjI4ZmQtNDA5YS00MmYyLThkYTctNDllMWUwZDkzNmVjIn0.MZuEuPspVa2Q-f5CWmWKX3F2D_6Lda5O4Nj6Gihk0OrU_FEeqsCKaektemi5u3_UjIPiiJate_zGQvar5l3TCQ", // Substitua pelo token de autenticação, se necessário
});

async function createTables() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS palavras (
        palavraUnica TEXT PRIMARY KEY,
        dados TEXT
      );
    `);
    console.log("Tabelas criadas ou já existentes.");
  } catch (error: any) {
    console.error("Erro ao criar tabelas:", error.message);
  }
}
createTables();

export async function POST(request: Request) {
  try {
    const data: any = await request.json();
    console.log("API - Recebendo dados via POST:", data);

    await db.execute({
      sql: "INSERT INTO palavras (palavraUnica, dados) VALUES (?, ?)",
      args: [data.palavraUnica, JSON.stringify(data)],
    });

    console.log("API - Dados salvos no banco de dados:", data);
    return NextResponse.json({ message: "Dados salvos com sucesso!" });
  } catch (error: any) {
    console.error("API - Erro ao salvar dados via POST:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const palavraUnica = searchParams.get("palavraUnica");

  console.log(
    "API - Recebendo solicitação GET para palavraUnica:",
    palavraUnica
  );

  if (!palavraUnica) {
    console.error("API - Palavra única não fornecida na solicitação GET.");
    return NextResponse.json(
      { error: "Palavra única é obrigatória." },
      { status: 400 }
    );
  }

  try {
    const result: any = await db.execute({
      sql: "SELECT dados FROM palavras WHERE palavraUnica = ?",
      args: [palavraUnica],
    });

    if (result.rows.length > 0) {
      const dados = JSON.parse(result.rows[0].dados);
      console.log("API - Dados encontrados via GET:", dados);
      return NextResponse.json(dados);
    } else {
      console.error(
        "API - Dados não encontrados para a palavraUnica:",
        palavraUnica
      );
      return NextResponse.json(
        { error: "Dados não encontrados." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("API - Erro ao buscar dados via GET:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
