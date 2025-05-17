import db from "../db.js";

// Função para inserir um novo funcionário
async function inserir(nome) {
  try {
    const [result] = await db.query(
      "INSERT INTO funcionarios (nome) VALUES (?)",
      [nome]
    );
    return { id: result.insertId, nome };
  } catch (err) {
    throw new Error("Erro ao inserir funcionário: " + err.message);
  }
}

// Função para listar todos os funcionários
async function listar() {
  try {
    const [rows] = await db.query("SELECT * FROM funcionarios");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar funcionários: " + err.message);
  }
}

// Função para editar um funcionário existente
async function editar(id, nome) {
  try {
    const [result] = await db.query(
      "UPDATE funcionarios SET nome=? WHERE id=?",
      [nome, id]
    );
    return result; // Pode incluir o número de registros afetados
  } catch (err) {
    throw new Error("Erro ao editar funcionário: " + err.message);
  }
}

// Função para excluir um funcionário
async function excluir(id) {
  try {
    const [result] = await db.query("DELETE FROM funcionarios WHERE id=?", [id]);
    return result; // Pode conter informações de quantos registros foram excluídos
  } catch (err) {
    throw new Error("Erro ao excluir funcionário: " + err.message);
  }
}

export default { inserir, listar, editar, excluir };
