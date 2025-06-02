import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
 

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error("Erro na conexão com MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL");
});

export default db;
