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

//CRUD 

app.use(express.json())

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

app.get("/book/:id_book", (request, response) => {
    const id = request.params.id_book

    const sql = `
        SELECT * FROM book
        WHERE id_book=${id}
    `
    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        response.render("book", {book})
    })
})

app.get("/register", (request, response) =>{
    response.render("register")
})

app.get("/", (request, response) => {
    const sql = 'SELECT * FROM book'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data
        console.log(book)
        response.render("home", { book })
    })
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


