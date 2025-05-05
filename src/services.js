import db from "./db.js";

// Verifica se uma categoria existe no banco
async function verificarExistenciaCategoria(descricaoCategoria) {
    return new Promise((resolve) => {
        db.query("SELECT 1 FROM categorias WHERE descricao = ?", [descricaoCategoria], (err, rows) => {
            resolve(rows.length > 0);
        });
    });
}

// Verifica se uma turma existe no banco
async function verificarExistenciaTurma(nomeTurma) {
    return new Promise((resolve) => {
        db.query("SELECT 1 FROM turmas WHERE nome = ?", [nomeTurma], (err, rows) => {
            resolve(rows.length > 0);
        });
    });
}


// Verifica se um dado existe no banco (usado para alunos, livros e funcionários)
async function verificarExistencia(tabela, coluna, valor) {
    return new Promise((resolve) => {
        db.query(`SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`, [valor], (err, rows) => {
            resolve(rows.length > 0);
        });
    });
}

// Validação de aluno (agora verificando se a turma está cadastrada no banco)
export async function validarAluno(aluno) {
    if (!aluno.matricula || !aluno.nome || !aluno.turma) {
        return "Matrícula, nome e turma são obrigatórios.";
    }
    const turmaExiste = await verificarExistenciaTurma(aluno.turma);
    
    if (!turmaExiste) return "Turma inválida. Cadastre a turma antes de usá-la.";

    return null;
}

// Validação de livro (agora verificando se a categoria e autor existem no banco)
export async function validarLivro(livro) {
    if (!livro.titulo || !livro.autor || !livro.categoria) {
        return "Título, autor e categoria são obrigatórios.";
    }

    const categoriaExiste = await verificarExistenciaCategoria(livro.categoria);
    if (!categoriaExiste) return "Categoria inválida. Cadastre a categoria antes de usá-la.";

    const autorExiste = await verificarExistencia("autores", "nome", livro.autor);
    if (!autorExiste) return "Autor inválido. Cadastre o autor antes de usá-lo.";

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
        return "Todos os campos do empréstimo são obrigatórios.";
    }

    const dataRegex = /^(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})$/; // Aceita DD/MM/YYYY e YYYY-MM-DD
    if (!dataRegex.test(emprestimo.data)) {
        return "Data inválida. Use o formato DD/MM/YYYY ou YYYY-MM-DD.";
    }

    const alunoExiste = await verificarExistencia("alunos", "matricula", emprestimo.aluno);
    if (!alunoExiste) return "Aluno não cadastrado.";

    const livroExiste = await verificarExistencia("livros", "codigo", emprestimo.livro);
    if (!livroExiste) return "Livro não cadastrado.";

    const funcionarioExiste = await verificarExistencia("funcionarios", "id", emprestimo.funcionario);
    if (!funcionarioExiste) return "Funcionário não cadastrado.";

    return null;
}


// Verificar se já existe na tabela antes do cadastro
async function verificarDuplicidade(tabela, campo, valor) {
    return new Promise((resolve) => {
        db.query(`SELECT * FROM ${tabela} WHERE ${campo} = ?`, [valor], (err, rows) => {
            resolve(rows.length > 0 ? rows[0] : null);
        });
    });
}

// Validação de autor antes de cadastrar
export async function validarAutor(autor) {
    if (!autor.nome) return "Nome do autor é obrigatório.";

    const existe = await verificarDuplicidade("autores", "nome", autor.nome);
    if (existe) return "Autor já está cadastrado.";

    return null;
}

// Validação de categoria antes de cadastrar
export async function validarCategoria(categoria) {
    if (!categoria.descricao) return "Descrição da categoria é obrigatória.";

    const existe = await verificarDuplicidade("categorias", "descricao", categoria.descricao);
    if (existe) return "Categoria já está cadastrada.";

    return null;
}

// Validação de turma antes de cadastrar
export async function validarTurma(turma) {
    if (!turma.nome) return "Nome da turma é obrigatório.";

    const existe = await verificarDuplicidade("turmas", "nome", turma.nome);
    if (existe) return "Turma já está cadastrada.";

    return null;
}
