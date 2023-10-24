const { response } = require("express")
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

app.get("/register", (request, response) =>{
    response.render("register")
})

//rotas

app.post("/register/save", (request, response) => {
    const {title, pageqty} = request.body

    const query = `
    INSERT INTO book (title, pageqty) 
    VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("/", (request, response) => {
    response.render("home")
})

//conectando com mysql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
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


