import alunoService from "../services/serviceAluno.js";

export async function Listar(req, res) {
  try {
    const alunos = await alunoService.listar();
    res.status(200).json({ alunos });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function Inserir(req, res) {
  try {
    const erro = await alunoService.validar(req.body);
    if (erro) return res.status(400).json({ erro });

    const { matricula, nome, turma } = req.body;
    const novoAluno = await alunoService.inserir(matricula, nome, turma);
    res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso",
      aluno: novoAluno,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor",
      detalhes: error.message,
    });
  }
}

export async function Editar(req, res) {
  try {
    const { matricula } = req.params;
    const { nome, turma } = req.body;
    const alunoAtualizado = await alunoService.editar(matricula, nome, turma);
    res.status(200).json({
      mensagem: "Aluno atualizado com sucesso",
      aluno: alunoAtualizado,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor",
      detalhes: error.message,
    });
  }
}

export async function Excluir(req, res) {
  try {
    const { matricula } = req.params;
    const resultado = await alunoService.excluir(matricula);
    res.status(200).json({
      mensagem: "Aluno excluído com sucesso",
      resultado,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor",
      detalhes: error.message,
    });
  }
}

export default { Listar, Inserir, Editar, Excluir };