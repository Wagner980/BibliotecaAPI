import db from "../db.js";

// Helper para verificar a existência de um registro em uma tabela
async function verificarExistencia(tabela, coluna, valor) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`, [valor], (err, rows) => {
      if (err) return reject(err);
      resolve(rows.length > 0);
    });
  });
}

// Validação do livro: garante que título, autor_id e categoria_id estejam presentes
// e que os registros associados existam nas respectivas tabelas.
export async function validarLivro(livro) {
  if (!livro.titulo || !livro.autor_id || !livro.categoria_id) {
    return "Título, autor e categoria são obrigatórios.";
  }
  
  const categoriaExiste = await verificarExistencia("categorias", "id", livro.categoria_id);
  if (!categoriaExiste) return "Categoria inválida. Cadastre a categoria antes de usá-la.";

  const autorExiste = await verificarExistencia("autores", "id", livro.autor_id);
  if (!autorExiste) return "Autor inválido. Cadastre o autor antes de usá-lo.";

  return null;
}

// Função para validar autor (útil se houver fluxo de cadastro de autor via livro)
export async function validarAutor(autor) {
  if (!autor.nome) return "Nome do autor é obrigatório.";

  const existe = await verificarDuplicidade("autores", "nome", autor.nome);
  if (existe) return "Autor já está cadastrado.";

  return null;
}

// Helper para verificar duplicidade de um registro
async function verificarDuplicidade(tabela, coluna, valor) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`, [valor], (err, rows) => {
      if (err) return reject(err);
      resolve(rows.length > 0);
    });
  });
}

export default { validarLivro, validarAutor };
