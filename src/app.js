import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis do .env

const app = express();   // Inicializa o app
app.use(express.json()); // Middleware para JSON
app.use(cors());

// Registrando rotas
app.use("/", routes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
