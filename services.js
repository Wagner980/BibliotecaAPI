const validSeries = [
    "1º ano adm", "1º ano agro", "1º ano inf", "1º ano ser",
    "2º ano agro", "2º ano fin", "2º ano inf", "2º ano ser",
    "3º ano adm", "3º ano agro", "3º ano inf", "3º ano ser"
];

const validCategories = ["Ficção", "Mistério", "Fantasia", "Ciência", "História"];

import db from "./db.js"; // Corrigida a importação de banco de dados

// Validação de aluno
export function validarAluno(aluno) {
    if (!aluno.matricula || !aluno.nome || !aluno.serie) {
        return "Matrícula, nome e série são obrigatórios";
    }
    if (!validSeries.includes(aluno.serie)) {
        return "Série inválida. Escolha entre as séries existentes.";
    }
    return null;
}

// Validação de livro
export function validarLivro(livro) {
    if (!livro.codigo || !livro.titulo || !livro.categoria || !livro.autor) {
        return "Código, título, categoria e autor são obrigatórios";
    }
    if (!validCategories.includes(livro.categoria)) {
        return "Categoria inválida. Escolha entre as categorias disponíveis.";
    }
    return null;
}

// Validação de funcionário
export function validarFuncionario(funcionario) {
    if (!funcionario.nome) {
        return "Nome do funcionário é obrigatório";
    }
    return null;
}

// Validação de empréstimos
export async function validarEmprestimo(emprestimo) {
    if (!emprestimo.data || !emprestimo.aluno || !emprestimo.livro || !emprestimo.funcionario) {
        return "Todos os campos do empréstimo são obrigatórios";
    }
    
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(emprestimo.data)) {
        return "Data inválida. Use o formato DD/MM/YYYY";
    }

    const alunoExiste = await verificarExistencia("alunos", "matricula", emprestimo.aluno);
    if (!alunoExiste) return "Aluno não cadastrado";

    const livroExiste = await verificarExistencia("livros", "codigo", emprestimo.livro);
    if (!livroExiste) return "Livro não cadastrado";

    const funcionarioExiste = await verificarExistencia("funcionarios", "id", emprestimo.funcionario);
    if (!funcionarioExiste) return "Funcionário não cadastrado";

    return null;
}

// Função auxiliar para verificar se um dado existe no banco
async function verificarExistencia(tabela, coluna, valor) {
    return new Promise((resolve) => {
        db.query(`SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`, [valor], (err, rows) => {
            resolve(rows.length > 0);
        });
    });
}
