import db from "../db.js";

// Função para inserir uma categoria
async function inserir(descricao) {
  try {
    const [result] = await db.query(
      "INSERT INTO categorias (descricao) VALUES (?)",
      [descricao]
    );
    const id = result.insertId;
    return { id, descricao };
  } catch (err) {
    throw new Error("Erro ao inserir categoria: " + err.message);
  }
}

// Função para listar todas as categorias
async function listar() {
  try {
    const [rows] = await db.query("SELECT id, descricao FROM categorias");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar categorias: " + err.message);
  }
}

// Função para editar uma categoria
async function editar(id, descricao) {
  try {
    const [result] = await db.query(
      "UPDATE categorias SET descricao=? WHERE id=?",
      [descricao, id]
    );
    return result; // Pode conter, por exemplo, o número de registros afetados
  } catch (err) {
    throw new Error("Erro ao editar categoria: " + err.message);
  }
}

// Função para excluir uma categoria
async function excluir(id) {
  try {
    const [result] = await db.query("DELETE FROM categorias WHERE id=?", [id]);
    return result;
  } catch (err) {
    throw new Error("Erro ao excluir categoria: " + err.message);
  }
}

export default { inserir, listar, editar, excluir };
