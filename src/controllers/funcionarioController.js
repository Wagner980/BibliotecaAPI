import db from "../db.js";
import { validarFuncionario } from "../services.js";


const funcionarioController = {
    Inserir: (req, res) => {
        const erro = validarFuncionario(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO funcionarios (nome) VALUES (?)", [req.body.nome], (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
        
            const id = result.insertId; // Obtém o ID gerado automaticamente pelo MySQL
            res.json({ mensagem: "Funcionário cadastrado com sucesso", id, nome: req.body.nome });
        });
        
    },

    Listar: (req, res) => {
        db.query("SELECT * FROM funcionarios", (err, rows) => {
            res.json(rows);
        });
    },

    Editar: (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
    
        db.query("SELECT id FROM funcionarios WHERE id = ?", [id], (err, rows) => {
            if (err || rows.length === 0) return res.status(404).json({ erro: "Funcionário não encontrado" });
    
            db.query("UPDATE funcionarios SET nome=? WHERE id=?", [nome, id], (err) => {
                res.json(err ? { erro: err.message } : { mensagem: "Funcionário atualizado com sucesso" });
            });
        });
    },
    
    Excluir: (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM funcionarios WHERE id=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Funcionário excluído" });
        });
    }
};

export default funcionarioController;
