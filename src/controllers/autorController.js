import autorService from "../services/serviceAutor.js";


async function Listar(req, res) {
  try {
    const autores = await autorService.listar();
    res.status(200).json(autores);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Inserir(req, res) {
  try {
    const { nome } = req.body;
    if (!nome || nome.trim() === "") {
      return res.status(400).json({ erro: "Nome do autor é obrigatório" });
    }
    
    const autor = await autorService.inserir(nome);
    res.status(201).json({ mensagem: "Autor cadastrado com sucesso", ...autor });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome || nome.trim() === "") {
      return res.status(400).json({ erro: "Nome do autor é obrigatório" });
    }
    
    await autorService.editar(id, nome);
    res.status(200).json({ mensagem: "Autor atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    
    await autorService.excluir(id);
    res.status(200).json({ mensagem: "Autor excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Listar, Inserir, Editar, Excluir };
