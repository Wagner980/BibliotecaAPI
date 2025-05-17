import funcionarioRepository from "../repositories/funcionarioRepository.js";
import { validarFuncionario } from "../services/serviceFuncionario.js";

// Insere um novo funcionário
async function Inserir(req, res) {
  try {
    // Valida os dados do funcionário usando a função de validação
    const erro = validarFuncionario(req.body);
    if (erro) return res.status(400).json({ erro });

    const { nome } = req.body;
    // Chama o repositório para inserir o funcionário
    const novoFuncionario = await funcionarioRepository.inserir(nome.trim());
    res.status(201).json({
      mensagem: "Funcionário cadastrado com sucesso",
      ...novoFuncionario,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Lista todos os funcionários
async function Listar(req, res) {
  try {
    const funcionarios = await funcionarioRepository.listar();
    res.status(200).json(funcionarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Edita um funcionário existente
async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    // Verifica se o funcionário existe
    const funcionarios = await funcionarioRepository.listar();
    const funcionarioExiste = funcionarios.find((f) => f.id == id);
    if (!funcionarioExiste) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }

    // Atualiza o funcionário com o novo nome
    const resultado = await funcionarioRepository.editar(id, nome.trim());
    res.status(200).json({ mensagem: "Funcionário atualizado com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Exclui um funcionário
async function Excluir(req, res) {
  try {
    const { id } = req.params;
    const resultado = await funcionarioRepository.excluir(id);
    res.status(200).json({ mensagem: "Funcionário excluído com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Inserir, Listar, Editar, Excluir };
