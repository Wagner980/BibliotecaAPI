import autorRepository from "../repositories/autorRepository.js";

async function listar() {
  return await autorRepository.listar();
}

async function inserir(nome) {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome do autor é obrigatório.");
  }
  return await autorRepository.inserir(nome.trim());
}

async function editar(id, nome) {
  if (!id) {
    throw new Error("ID do autor é obrigatório.");
  }
  if (!nome || nome.trim() === "") {
    throw new Error("Nome do autor é obrigatório.");
  }
  return await autorRepository.editar(id, nome.trim());
}

async function excluir(id) {
  if (!id) {
    throw new Error("ID do autor é obrigatório.");
  }
  return await autorRepository.excluir(id);
}

export default { listar, inserir, editar, excluir };
