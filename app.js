const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const admin = require('./routes/admin')
const path = require("path")
const mongoose = require('mongoose')
const session = require("express-session")
const cors = require('cors')

app.use(session({
    secret: "aprendendonode",
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

const hbs = handlebars.create({defaultLayout: 'main', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
})

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/great_fun").then(() =>{
    console.log("Conectado ao mongo")
}).catch((err)=>{
    console.log("Erro ao se conectar: "+err)
})

app.use(express.static(path.join(__dirname, "public")))

app.use('/', admin)

app.use((req, res, next) =>{
    console.log("Requisição monitorada!")
    next()
})

const PORT = 8080
app.listen(PORT,() => {
    console.log("Servidor rodando URL: http://localhost:"+PORT+"/")
})