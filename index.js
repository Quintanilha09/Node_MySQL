const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express() 

//definindo handlebars como template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

//pasta de arquivos estáticos como CSS, imagens
app.use(express.static("public"))

//trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas
app.get('/', (req, res) => {
    res.render("home")
})

//conectando com mysql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao mysql")
    app.listen(8080, () => {
        console.log("Servidor rodando na porta 8080")
    })
}) 


