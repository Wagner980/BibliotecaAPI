import db from "../db.js";
import { validarLivro } from "../services.js";

const livroController = {
    Inserir: async (req, res) => {
        const erro = await validarLivro(req.body);
        if (erro) return res.status(400).json({ erro });

        db.query("INSERT INTO livros (titulo, autor, categoria_id) VALUES (?, ?, ?)", 
            [req.body.titulo, req.body.autor, req.body.categoria_id], 
            (err) => {
                res.json(err ? { erro: err.message } : { mensagem: "Livro cadastrado com sucesso" });
            }
        );
    },

    Listar: (req, res) => {
        db.query(`
            SELECT livros.id, livros.titulo, livros.autor, livros.categoria_id, categorias.descricao AS categoria
            FROM livros
            JOIN categorias ON livros.categoria_id = categorias.id`, 
        (err, rows) => {
            res.json(rows);
        });
    },

    Editar: (req, res) => {
        const { id } = req.params;
        const { titulo, categoria_id, autor_id } = req.body;
        
        db.query("UPDATE livros SET titulo=?, categoria_id=?, autor_id=? WHERE id=?", [titulo, categoria_id, autor_id, id], (err) => {
            res.json(err ? { erro: err.message } : { mensagem: "Livro atualizado com sucesso" });
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
