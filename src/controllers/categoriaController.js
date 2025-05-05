import db from "../db.js";


const categoriaController = {
    Inserir: (req, res) => {
        const { descricao } = req.body;
        if (!descricao) return res.status(400).json({ erro: "Descrição da categoria é obrigatória" });

        db.query("INSERT INTO categorias (descricao) VALUES (?)", [descricao], (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });

            const id = result.insertId; // Obtém o ID gerado pelo MySQL
            res.json({ mensagem: "Categoria cadastrada com sucesso", id, descricao });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT id, descricao FROM categorias", (err, rows) => {
            res.json(err ? { erro: err.message } : rows);
        });
    },
    Editar: (req, res) => {
        const { id } = req.params;
        const { descricao } = req.body;
    
        db.query("UPDATE categorias SET descricao=? WHERE id=?", [descricao, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Categoria atualizada com sucesso" });
        });
    },
    
    

    Excluir: (req, res) => {
        const { id } = req.params;
        
        db.query("DELETE FROM categorias WHERE id=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Categoria excluída com sucesso" });
        });
    }
};

export default categoriaController;
