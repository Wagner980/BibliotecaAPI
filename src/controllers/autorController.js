import db from "../db.js";


const autorController = {
    Inserir: (req, res) => {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ erro: "Nome do autor é obrigatório" });

        db.query("INSERT INTO autores (nome) VALUES (?)", [nome], (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });

            const id = result.insertId; // Obtém o ID gerado pelo MySQL
            res.json({ mensagem: "Autor cadastrado com sucesso", id, nome });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT id, nome FROM autores", (err, rows) => {
            res.json(err ? { erro: err.message } : rows);
        });
    },
    Editar: (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
        
        db.query("UPDATE autores SET nome=? WHERE id=?", [nome, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Autor atualizado com sucesso" });
        });
    },

    Excluir: (req, res) => {
        const { id } = req.params;
        
        db.query("DELETE FROM autores WHERE id=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Autor excluído com sucesso" });
        });
    }
};

export default autorController;
