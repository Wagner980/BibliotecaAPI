import db from "../db.js";
import alunoRepository from "../repositories/alunoRepository.js";

// Função para verificar se uma turma existe na tabela "turmas"
async function verificarExistenciaTurma(nomeTurma) {
  const sql = "SELECT 1 FROM turmas WHERE nome = ?";
  const [rows] = await db.query(sql, [nomeTurma.trim()]);
  return rows.length > 0;
}

// Função para validar os dados do aluno
// Retorna uma mensagem de erro caso alguma condição não seja satisfeita ou null se estiver correto
async function validar(aluno) {
  if (!aluno.matricula || aluno.matricula.trim() === "")
    return "Matrícula é obrigatória.";
  if (!aluno.nome || aluno.nome.trim() === "")
    return "Nome é obrigatório.";
  if (!aluno.turma || aluno.turma.trim() === "")
    return "Turma é obrigatória.";

  // Verifica se a turma realmente existe
  const turmaExiste = await verificarExistenciaTurma(aluno.turma);
  if (!turmaExiste)
    return "Turma inválida. Cadastre a turma antes de usá-la.";

  return null;
}

// Operações CRUD integradas com o repositório

async function listar() {
  return await alunoRepository.listar();
}

async function inserir(matricula, nome, turma) {
  return await alunoRepository.inserir(matricula, nome, turma);
}

async function editar(matricula, nome, turma) {
  return await alunoRepository.editar(matricula, nome, turma);
}

async function excluir(matricula) {
  return await alunoRepository.excluir(matricula);
}

const alunoService = {
  validar,
  listar,
  inserir,
  editar,
  excluir,
};

export default alunoService;
