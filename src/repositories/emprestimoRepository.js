import db from "../db.js";

// Insere um novo empréstimo na tabela emprestimos
async function inserir(data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id) {
  try {
    const [result] = await db.query(
      "INSERT INTO emprestimos (data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id) VALUES (?, ?, ?, ?, ?, ?)",
      [data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id]
    );
    return { id: result.insertId, data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id };
  } catch (err) {
    throw new Error("Erro ao inserir empréstimo: " + err.message);
  }
}

// Lista todos os empréstimos
async function listar() {
  try {
    const [rows] = await db.query("SELECT * FROM emprestimos");
    return rows;
  } catch (err) {
    throw new Error("Erro ao listar empréstimos: " + err.message);
  }
}

// Atualiza um empréstimo existente
async function editar(id, data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id) {
  try {
    const [result] = await db.query(
      "UPDATE emprestimos SET data_emprestimo = ?, aluno_matricula = ?, nome_livro = ?, turma = ?, livro_id = ?, funcionario_id = ? WHERE id = ?",
      [data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id, id]
    );
    return result;
  } catch (err) {
    throw new Error("Erro ao editar empréstimo: " + err.message);
  }
}

// Exclui um empréstimo pelo id
async function excluir(id) {
  try {
    const [result] = await db.query("DELETE FROM emprestimos WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw new Error("Erro ao excluir empréstimo: " + err.message);
  }
}

export default { inserir, listar, editar, excluir };
