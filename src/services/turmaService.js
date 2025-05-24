// services/turmaService.js
import turmaRepository from "../repositories/turmaRepository.js";

async function Inserir(id, descricao) {
  return await turmaRepository.inserir(id, descricao);
}

async function Listar() {
  return await turmaRepository.listar();
}

async function Editar(id, descricao) {
  return await turmaRepository.editar(id, descricao);
}

async function Excluir(id) {
  return await turmaRepository.excluir(id);
}

export default { Inserir, Listar, Editar, Excluir };
