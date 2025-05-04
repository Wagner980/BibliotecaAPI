import db from "../db.js";
import { validarFuncionario } from "../services.js";


const funcionarioController = {
    Inserir: (req, res) => {
        const erro = validarFuncionario(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO funcionarios (nome) VALUES (?)", [req.body.nome], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Funcionário cadastrado" });
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
        db.query("UPDATE funcionarios SET nome=? WHERE id=?", [nome, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Funcionário atualizado" });
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
