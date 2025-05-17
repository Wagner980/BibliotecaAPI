import categoriaService from "../services/serviceCategoria.js";

async function Inserir(req, res) {
  try {
    const { descricao } = req.body;
    
    // Validação: verifica se a descrição é válida e não duplicada
    const erro = await categoriaService.validarCategoria(req.body);
    if (erro) {
      return res.status(400).json({ erro });
    }
    
    // Chama a função do service para inserir a categoria
    const novaCategoria = await categoriaService.inserir(descricao);
    
    res.status(201).json({
      mensagem: "Categoria cadastrada com sucesso",
      ...novaCategoria,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Listar(req, res) {
  try {
    // Chama a função do service para listar as categorias
    const categorias = await categoriaService.listar();
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { descricao } = req.body;
    
    if (!descricao || descricao.trim() === "") {
      return res.status(400).json({ erro: "Descrição da categoria é obrigatória." });
    }
    
    // Chama a função do service para editar a categoria
    await categoriaService.editar(id, descricao);
    res.status(200).json({ mensagem: "Categoria atualizada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    
    // Chama a função do service para excluir a categoria
    await categoriaService.excluir(id);
    res.status(200).json({ mensagem: "Categoria excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export default { Inserir, Listar, Editar, Excluir };
