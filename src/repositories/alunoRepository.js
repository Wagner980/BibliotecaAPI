import db from "../db.js";

// Função para listar todos os alunos da tabela ALUNO
async function listar() {
  const sql = "SELECT * FROM ALUNO";
  const [alunos] = await db.query(sql);
  return alunos;
}

// Função para inserir um novo aluno na tabela ALUNO
async function inserir(matricula, nome, turma) {
  const sql = "INSERT INTO ALUNO (MATRICULA, NOME, TURMA) VALUES (?, ?, ?)";
  await db.query(sql, [matricula, nome, turma]);
  // Retorna o aluno inserido para confirmação
  return { matricula, nome, turma };
}

// Função para atualizar os dados de um aluno existente via MATRICULA
async function editar(matricula, nome, turma) {
  const sql = "UPDATE ALUNO SET NOME = ?, TURMA = ? WHERE MATRICULA = ?";
  await db.query(sql, [nome, turma, matricula]);
  return { matricula, nome, turma };
}

// Função para excluir um aluno da tabela ALUNO usando a MATRICULA
async function excluir(matricula) {
  const sql = "DELETE FROM ALUNO WHERE MATRICULA = ?";
  await db.query(sql, [matricula]);
  return { matricula };
}

export default { listar, inserir, editar, excluir };
