import db from "../db.js";


const turmaController = {
    Inserir: (req, res) => {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ erro: "Nome da turma é obrigatório" });

        db.query("INSERT INTO turmas (nome) VALUES (?)", [nome], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Turma cadastrada com sucesso" });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT * FROM turmas", (err, rows) => {
            res.json(err ? { erro: err.message } : rows);
        });
    },
    Editar: (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
        
        db.query("UPDATE turmas SET nome=? WHERE id=?", [nome, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Turma atualizada com sucesso" });
        });
    },

    Excluir: (req, res) => {
        const { id } = req.params;
        
        db.query("DELETE FROM turmas WHERE id=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Turma excluída com sucesso" });
        });
    }
};

export default turmaController;
