import db from "../db.js";
import { validarAluno } from "../services.js";

const alunoController = {
    Inserir: (req, res) => {
        const erro = validarAluno(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO alunos VALUES (?, ?, ?)", [req.body.matricula, req.body.nome, req.body.turma], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Aluno cadastrado" });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT * FROM alunos", (err, rows) => {
            res.json(rows);
        });
    },

    Editar: (req, res) => {
        const { id } = req.params;
        const { nome, turma } = req.body;
        db.query("UPDATE alunos SET nome=?, turma=? WHERE matricula=?", [nome, turma, id], (err) => {        
            res.json(err ? { erro: err.message } : { mensagem: "Aluno atualizado" });
        });
    },

    Excluir: (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM alunos WHERE matricula=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Aluno excluído" });
        });
    }
};

export default alunoController;
