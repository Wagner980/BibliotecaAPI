import db from "../db.js";
import categoriaRepository from "../repositories/categoriaRepository.js";

// Helper para verificar duplicidade na tabela categorias
async function verificarDuplicidade(tabela, coluna, valor) {
  return new Promise((resolve, reject) => {
    // Utilizamos a consulta parametrizada; tabela e coluna são fixos e controlados
    db.query(
      `SELECT 1 FROM ${tabela} WHERE ${coluna} = ?`,
      [valor.trim()],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows.length > 0);
      }
    );
  });
}

// Função de validação da categoria
export async function validarCategoria(categoria) {
  if (!categoria.descricao || categoria.descricao.trim() === "") {
    return "Descrição da categoria é obrigatória.";
  }

  try {
    const existe = await verificarDuplicidade("categorias", "descricao", categoria.descricao);
    if (existe) {
      return "Categoria já está cadastrada.";
    }
  } catch (error) {
    return "Erro ao validar a categoria: " + error.message;
  }
  
  return null;
}

// Funções CRUD que utilizam o repository

async function listar() {
  return await categoriaRepository.listar();
}

async function inserir(descricao) {
  if (!descricao || descricao.trim() === "") {
    throw new Error("Descrição da categoria é obrigatória.");
  }
  return await categoriaRepository.inserir(descricao.trim());
}

async function editar(id, descricao) {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  if (!descricao || descricao.trim() === "") {
    throw new Error("Descrição da categoria é obrigatória.");
  }
  return await categoriaRepository.editar(id, descricao.trim());
}

async function excluir(id) {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  return await categoriaRepository.excluir(id);
}

export default { validarCategoria, listar, inserir, editar, excluir };
