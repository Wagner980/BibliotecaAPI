import db from "../db.js";
import { validarFuncionario } from "../services.js";


const emprestimoController = {
    Inserir: async (req, res) => {
        const erro = await validarEmprestimo(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO emprestimos (data, aluno, livro, funcionario) VALUES (?, ?, ?, ?)", [req.body.data, req.body.aluno, req.body.livro, req.body.funcionario], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Empréstimo registrado" });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT * FROM emprestimos", (err, rows) => {
            res.json(rows);
        });
    },

    Editar: (req, res) => {
        const { id } = req.params;
        const { data, aluno, livro, funcionario } = req.body;
        db.query("UPDATE emprestimos SET data=?, aluno=?, livro=?, funcionario=? WHERE id=?", [data, aluno, livro, funcionario, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Empréstimo atualizado" });
        });
    },

    Excluir: (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM emprestimos WHERE id=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Empréstimo excluído" });
        });
    }
};

export default emprestimoController;
