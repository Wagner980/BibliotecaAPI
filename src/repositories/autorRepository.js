import db from "../db.js";

// Função para listar os autores
async function listar() {
  try {
    const [rows] = await db.query("SELECT id, nome FROM autores");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar autores: " + err.message);
  }
}

// Função para inserir um autor
async function inserir(nome) {
  try {
    const [result] = await db.query("INSERT INTO autores (nome) VALUES (?)", [nome]);
    return { id: result.insertId, nome };
  } catch (err) {
    throw new Error("Erro ao inserir autor: " + err.message);
  }
}

// Função para editar um autor
async function editar(id, nome) {
  try {
    const [result] = await db.query("UPDATE autores SET nome=? WHERE id=?", [nome, id]);
    return result;
  } catch (err) {
    throw new Error("Erro ao editar autor: " + err.message);
  }
}

// Função para excluir um autor
async function excluir(id) {
  try {
    const [result] = await db.query("DELETE FROM autores WHERE id=?", [id]);
    return result;
  } catch (err) {
    throw new Error("Erro ao excluir autor: " + err.message);
  }
}

export default { listar, inserir, editar, excluir };
