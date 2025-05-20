import funcionarioRepository from "../repositories/funcionarioRepository.js";
import { validarFuncionario } from "../services/serviceFuncionario.js";

// Insere um novo funcionário usando email e senha
async function Inserir(req, res) {
  try {
    // Valida os dados do funcionário usando a função atualizada
    const erro = validarFuncionario(req.body);
    if (erro) return res.status(400).json({ erro });

    const { email, senha } = req.body;
    // Chama o repositório para inserir o funcionário com os dados atualizados
    const novoFuncionario = await funcionarioRepository.inserir(email.trim(), senha.trim());
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
// Agora utiliza o parâmetro "senha" (anteriormente "id") para identificar o funcionário
// E atualiza o campo de email (anteriormente "nome")
async function Editar(req, res) {
  try {
    const { senha } = req.params; // anteriormente "id"
    const { email } = req.body;   // anteriormente "nome"

    // Verifica se o funcionário existe (buscando pela "senha")
    const funcionarios = await funcionarioRepository.listar();
    const funcionarioExiste = funcionarios.find((f) => f.senha == senha);
    if (!funcionarioExiste) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }

    // Atualiza o funcionário com o novo email
    const resultado = await funcionarioRepository.editar(senha, email.trim());
    res.status(200).json({ mensagem: "Funcionário atualizado com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Exclui um funcionário
// Utiliza "senha" (anteriormente "id") para identificar qual funcionário excluir
async function Excluir(req, res) {
  try {
    const { senha } = req.params; // anteriormente "id"
    const resultado = await funcionarioRepository.excluir(senha);
    res.status(200).json({ mensagem: "Funcionário excluído com sucesso", resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Inserir, Listar, Editar, Excluir };
