import db from "../db.js";

async function listar() {
  try {
    const sql = `
      SELECT livros.id, livros.titulo, livros.autor_id, autores.nome AS autor,
             livros.categoria_id, categorias.descricao AS categoria
      FROM livros
      JOIN categorias ON livros.categoria_id = categorias.id
      JOIN autores ON livros.autor_id = autores.id
    `;
    const [livros] = await db.query(sql);
    return livros;
  } catch (error) {
    throw new Error("Erro ao listar livros: " + error.message);
  }
}

async function inserir(titulo, autor_id, categoria_id) {
  try {
    const sql = "INSERT INTO livros (titulo, autor_id, categoria_id) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [titulo, autor_id, categoria_id]);
    return { id: result.insertId, titulo, autor_id, categoria_id };
  } catch (error) {
    throw new Error("Erro ao inserir livro: " + error.message);
  }
}

async function editar(id, titulo, autor_id, categoria_id) {
  try {
    const sql = "UPDATE livros SET titulo = ?, autor_id = ?, categoria_id = ? WHERE id = ?";
    await db.query(sql, [titulo, autor_id, categoria_id, id]);
    return { mensagem: "Livro atualizado com sucesso" };
  } catch (error) {
    throw new Error("Erro ao editar livro: " + error.message);
  }
}

async function excluir(id) {
  try {
    const sql = "DELETE FROM livros WHERE id = ?";
    await db.query(sql, [id]);
    return { mensagem: "Livro excluído com sucesso" };
  } catch (error) {
    throw new Error("Erro ao excluir livro: " + error.message);
  }
}

export default { listar, inserir, editar, excluir };
