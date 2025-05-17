import serviceEmprestimo from "../services/serviceEmprestimo.js";

async function Inserir(req, res) {
  try {
    // Validação: confere se os dados estão corretos e completos
    const erro = await serviceEmprestimo.validarEmprestimo(req.body);
    if (erro) return res.status(400).json({ erro });

    const { 
      data_emprestimo, 
      aluno_matricula, 
      nome_livro, 
      turma, 
      livro_id, 
      funcionario_id 
    } = req.body;

    // Chama o service para inserir o novo empréstimo
    const novoEmprestimo = await serviceEmprestimo.inserir(
      data_emprestimo,
      aluno_matricula,
      nome_livro,
      turma,
      livro_id,
      funcionario_id
    );

    res.status(201).json({ mensagem: "Empréstimo registrado com sucesso", ...novoEmprestimo });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Listar(req, res) {
  try {
    const emprestimos = await serviceEmprestimo.listar();
    res.status(200).json(emprestimos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { 
      data_emprestimo, 
      aluno_matricula, 
      nome_livro, 
      turma, 
      livro_id, 
      funcionario_id 
    } = req.body;

    // Chama o service para atualizar o empréstimo
    const resultado = await serviceEmprestimo.editar(
      id,
      data_emprestimo,
      aluno_matricula,
      nome_livro,
      turma,
      livro_id,
      funcionario_id
    );
    res.status(200).json({ mensagem: "Empréstimo atualizado com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    const resultado = await serviceEmprestimo.excluir(id);
    res.status(200).json({ mensagem: "Empréstimo excluído com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Inserir, Listar, Editar, Excluir };
