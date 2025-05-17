import db from "../db.js";
import repositoryEmprestimo from "../repositories/emprestimoRepository.js";

// Função de validação para o empréstimo
export async function validarEmprestimo(emprestimo) {
  // Verifica se todos os campos obrigatórios foram enviados
  if (
    !emprestimo.data_emprestimo ||
    !emprestimo.aluno_matricula ||
    !emprestimo.nome_livro ||
    !emprestimo.turma ||
    !emprestimo.livro_id ||
    !emprestimo.funcionario_id
  ) {
    return "Todos os campos do empréstimo são obrigatórios.";
  }

  // Validação do formato da data (aceita DD/MM/YYYY ou YYYY-MM-DD)
  const dataRegex = /^(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})$/;
  if (!dataRegex.test(emprestimo.data_emprestimo)) {
    return "Data inválida. Use o formato DD/MM/YYYY ou YYYY-MM-DD.";
  }

  // Helper para verificar se um registro existe em determinada tabela e coluna
  async function verificarExistencia(tabela, coluna, valor) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`, [valor], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.length > 0);
      });
    });
  }

  // Valida se o aluno existe (usando a matrícula na tabela "alunos")
  const alunoExiste = await verificarExistencia("alunos", "matricula", emprestimo.aluno_matricula);
  if (!alunoExiste) return "Aluno não cadastrado.";

  // Valida se o livro existe (usando o código do livro na tabela "livros")
  const livroExiste = await verificarExistencia("livros", "codigo", emprestimo.livro_id);
  if (!livroExiste) return "Livro não cadastrado.";

  // Valida se o funcionário existe (usando o id na tabela "funcionarios")
  const funcionarioExiste = await verificarExistencia("funcionarios", "id", emprestimo.funcionario_id);
  if (!funcionarioExiste) return "Funcionário não cadastrado.";

  return null;
}

// Função para listar os empréstimos
async function listar() {
  return await repositoryEmprestimo.listar();
}

// Função para inserir um novo empréstimo
async function inserir(data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id) {
  if (!data_emprestimo || !aluno_matricula || !nome_livro || !turma || !livro_id || !funcionario_id) {
    throw new Error("Todos os campos do empréstimo são obrigatórios.");
  }
  return await repositoryEmprestimo.inserir(data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id);
}

// Função para atualizar um empréstimo
async function editar(id, data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id) {
  if (!id) throw new Error("ID do empréstimo é obrigatório.");
  if (!data_emprestimo || !aluno_matricula || !nome_livro || !turma || !livro_id || !funcionario_id) {
    throw new Error("Todos os campos do empréstimo são obrigatórios.");
  }
  return await repositoryEmprestimo.editar(id, data_emprestimo, aluno_matricula, nome_livro, turma, livro_id, funcionario_id);
}

// Função para excluir um empréstimo
async function excluir(id) {
  if (!id) throw new Error("ID do empréstimo é obrigatório.");
  return await repositoryEmprestimo.excluir(id);
}

export default { validarEmprestimo, listar, inserir, editar, excluir };
