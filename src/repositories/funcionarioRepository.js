import db from "../db.js";

// Função para inserir um novo funcionário usando email e senha
async function inserir(email, senha) {
  try {
    const [result] = await db.query(
      "INSERT INTO funcionarios (email, senha) VALUES (?, ?)",
      [email, senha]
    );
    // Retornando os dados cadastrados; note que estamos seguindo a especificação:
    // o que era retornado como id passa a ser senha, e o que era nome passa a ser email.
    return { email, senha };
  } catch (err) {
    throw new Error("Erro ao inserir funcionário: " + err.message);
  }
}

// Função para listar todos os funcionários
async function listar() {
  try {
    // Espera que na tabela existam as colunas 'email' e 'senha'
    const [rows] = await db.query("SELECT * FROM funcionarios");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar funcionários: " + err.message);
  }
}

// Função para editar um funcionário existente (identificado pela "senha")
async function editar(senha, email) {
  try {
    const [result] = await db.query(
      "UPDATE funcionarios SET email=? WHERE senha=?",
      [email, senha]
    );
    return result; // Pode retornar informações sobre quantos registros foram atualizados
  } catch (err) {
    throw new Error("Erro ao editar funcionário: " + err.message);
  }
}

// Função para excluir um funcionário (identificado pela "senha")
async function excluir(senha) {
  try {
    const [result] = await db.query("DELETE FROM funcionarios WHERE senha=?", [senha]);
    return result; // Pode conter informações de quantos registros foram excluídos
  } catch (err) {
    throw new Error("Erro ao excluir funcionário: " + err.message);
  }
}

export default { inserir, listar, editar, excluir };
