import db from "../db.js";
import { validarLivro } from "../services.js";

const livroController = {
    Inserir: (req, res) => {
        const erro = validarLivro(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO livros VALUES (?, ?, ?, ?)", [req.body.codigo, req.body.titulo, req.body.categoria, req.body.autor], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Livro cadastrado" });
        });
    },

    Listar: (req, res) => {
        db.query("SELECT * FROM livros", (err, rows) => {
            res.json(rows);
        });
    },

    Editar: (req, res) => {
        const { id } = req.params;
        const { titulo, categoria, autor } = req.body;
        db.query("UPDATE livros SET titulo=?, categoria=?, autor=? WHERE codigo=?", [titulo, categoria, autor, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Livro atualizado" });
        });
    },

    Excluir: (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM livros WHERE codigo=?", [id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Livro excluído" });
        });
    }
};

export default livroController;
