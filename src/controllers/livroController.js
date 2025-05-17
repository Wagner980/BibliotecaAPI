import { validarLivro } from "../services/serviceLivro.js";

import livroRepository from "../repositories/livroRepository.js";

async function Listar(req, res) {
  try {
    const livros = await livroRepository.listar();
    res.status(200).json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Inserir(req, res) {
  try {
    const erro = await validarLivro(req.body);
    if (erro) return res.status(400).json({ erro });
    
    // Extrai os campos conforme o modelo do banco
    const { titulo, autor_id, categoria_id } = req.body;
    const novoLivro = await livroRepository.inserir(titulo, autor_id, categoria_id);
    res.status(201).json({ mensagem: "Livro cadastrado com sucesso", ...novoLivro });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor_id, categoria_id } = req.body;
    const resultado = await livroRepository.editar(id, titulo, autor_id, categoria_id);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    const resultado = await livroRepository.excluir(id);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Listar, Inserir, Editar, Excluir };
