// repositories/turmaRepository.js
import db from "../db.js";

// Insere uma nova turma na tabela "turma"
async function inserir(id, descricao) {
  try {
    await db.query(
      "INSERT INTO turma (id, descricao) VALUES (?, ?)",
      [id, descricao]
    );
    return { id, descricao };
  } catch (err) {
    throw new Error("Erro ao inserir turma: " + err.message);
  }
}

// Lista todas as turmas cadastradas
async function listar() {
  try {
    const [rows] = await db.query("SELECT * FROM turma");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar turmas: " + err.message);
  }
}

// Atualiza a descrição de uma turma existente identificada pelo id
async function editar(id, descricao) {
  try {
    await db.query("UPDATE turma SET descricao=? WHERE id=?", [descricao, id]);
    return { id, descricao };
  } catch (err) {
    throw new Error("Erro ao editar turma: " + err.message);
  }
}

// Exclui uma turma identificada pelo id
async function excluir(id) {
  try {
    await db.query("DELETE FROM turma WHERE id=?", [id]);
  } catch (err) {
    throw new Error("Erro ao excluir turma: " + err.message);
  }
}

export default { inserir, listar, editar, excluir };
