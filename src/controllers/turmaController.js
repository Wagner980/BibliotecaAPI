// controllers/turmaController.js
import turmaService from "../services/turmaService.js";

async function Inserir(req, res) {
  try {
    const { id, descricao } = req.body;

    if (!id || !descricao) {
      return res.status(400).json({ erro: "ID e descrição da turma são obrigatórios." });
    }

    const novaTurma = await turmaService.Inserir(id, descricao);
    res.status(201).json({
      mensagem: "Turma cadastrada com sucesso",
      turma: novaTurma,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno no servidor", detalhes: err.message });
  }
}

async function Listar(req, res) {
  try {
    const turmas = await turmaService.Listar();
    res.status(200).json(turmas);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno no servidor", detalhes: err.message });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(400).json({ erro: "Descrição da turma é obrigatória para edição." });
    }

    const turmaAtualizada = await turmaService.Editar(id, descricao);
    res.status(200).json({
      mensagem: "Turma atualizada com sucesso",
      turma: turmaAtualizada,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno no servidor", detalhes: err.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    await turmaService.Excluir(id);
    res.status(200).json({ mensagem: "Turma excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno no servidor", detalhes: err.message });
  }
}

export default { Inserir, Listar, Editar, Excluir };
