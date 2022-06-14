// Grupo de rotas
const express = require('express')
const req = require('express/lib/request')
const res = require("express/lib/response")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/login")
const Login = mongoose.model("login")
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize')
const alert = require('alert')

router.get('/', async(req, res) => {
    const games = await Game.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    const soft = await Software.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    const hd = await Hardware.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    res.render('../views/main/indexoff',{games, soft, hd})
})
router.get('/home', async(req, res)=>{
    const games = await Game.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    const soft = await Software.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    const hd = await Hardware.findAll({ order: Sequelize.literal('rand()'), limit: 4})
    const fav = await Produto.findAll({order: [['id', 'DESC']]})
    res.render('../views/main/index',{games, soft, hd, fav})
})
router.post('/off', (req, res)=>{
    res.send('Faça login primeiro, por favor!')
})

const sequelize = new Sequelize('great_fun', 'root', 'senha',{
    host: "localhost",
    dialect: "mysql" 
})
sequelize.authenticate().then(()=>{
    console.log('Conectado ao MySQL')
}).catch((err)=>{
    console.log('Erro ao se conectar:'+err)
})

const Produto = sequelize.define('favoritos',{
    nome: {
        type: Sequelize.STRING
    },
    preco_a_vista: {
        type: Sequelize.STRING
    },
    preco_a_prazo: {
        type: Sequelize.STRING
    },
    parcelas: {
        type: Sequelize.STRING
    }
})
// Produto.sync({force: true})

router.post("/favorito", function(req, res){
    const novofav = req.body
    Produto.create({
        nome: novofav.nome,
        preco_a_vista: novofav.valor_a_vista,
        preco_a_prazo: novofav.valor_a_prazo,
        parcelas: novofav.parcelas
    }).then(()=>{
        console.log("Salvo no MySQL")
        alert("Produto cadastrado nos favoritos")
        res.redirect('/home')
    })
})

router.get("/favorites", (req, res)=>{
    Produto.findAll({order: [['id', 'DESC']]}).then((produtos)=>{
        res.render('../views/main/favoritos',{produtos})
    }) 
})

router.post("/delete:id", (req, res) =>{
    Produto.destroy({
        where: {'id': req.params.id}
    }).then(() =>{
        res.redirect("/favorites")
    }).catch((err) =>{
        res.send('erro: '+err)
    })
})

// router.post("/favorito", (req, res) =>{
//     const novofav ={
//         nome: req.body.nome,
//         preco_a_vista: req.body.valor_a_vista,
//         preco_a_prazo: req.body.valor_a_prazo,
//         parcelas: req.body.parcelas
//     }

//     new Favoritos(novofav).save().then(() => {
//         res.redirect("/")
//     }).catch((err) => {
//         res.redirect("/")
//     })
// })

router.post('/cadastro', async(req,res)=>{
    const novologin ={
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    new Login(novologin).save().then(() => {
        res.redirect("/home")
    }).catch((err) => {
        res.redirect("/home")
        console.log(err)
    })
})

router.post('/login', async (req, res)=>{
    const {email, senha} = req.body;
    const user = await Login.findOne({email}).select('senha')
    // Verificamos se o campo password realmente é dele mesmo
    if(!user)
    return res.status(400).send({error: "Usuário não encontrado"})
    // Verificação se a senha é a mesma que foi cadastrada
    if(!await bcrypt.compare(senha, user.senha))
    return res.status(400).send({error: "Senha incorreta"})

    res.redirect('/home')
})

// Rota para add produtos

const Hardware = sequelize.define('hardware',{
    img: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    preco_a_vista: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    preco_a_prazo: {
        type: Sequelize.STRING
    },
    parcelas: {
        type: Sequelize.STRING
    }
})
// Hardware.sync({force: true})
router.get("/newhardware", (req,res)=>{
    Hardware.findAll({order: [['id', 'DESC']]}).then((produtos1)=>{
        res.render('./form/newhard',{produtos1})
    })  
    // res.render('./form/newhard')
})
router.post("/newhardware", function(req, res){
    const novoprod = req.body
    Hardware.create({
        img: novoprod.img,
        nome: novoprod.nome,
        preco_a_vista: novoprod.valor_a_vista,
        desc: novoprod.desc,
        preco_a_prazo: novoprod.valor_a_prazo,
        parcelas: novoprod.parcelas
    }).then(()=>{
        console.log("Salvo no MySQL")
        res.redirect('/home')
    })
})
router.post("/deletehd/:id", (req, res) =>{
    Hardware.destroy({
        where: {'id': req.params.id}
    }).then(() =>{
        res.redirect("/home")
    }).catch((err) =>{
        res.send('erro: '+err)
    })
})

const Software = sequelize.define('software',{
    img: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    preco_a_vista: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    preco_a_prazo: {
        type: Sequelize.STRING
    },
    parcelas: {
        type: Sequelize.STRING
    }
})
// Software.sync({force: true})
router.get("/newsoftware", (req,res)=>{ 
    Software.findAll({order: [['id', 'DESC']]}).then((produtos2)=>{
        res.render('./form/newsoft',{produtos2})
    }) 
    // res.render('./form/newsoft')
})
router.post("/newsoftware", function(req, res){
    const novoprod = req.body
    Software.create({
        img: novoprod.img,
        nome: novoprod.nome,
        preco_a_vista: novoprod.valor_a_vista,
        desc: novoprod.desc,
        preco_a_prazo: novoprod.valor_a_prazo,
        parcelas: novoprod.parcelas
    }).then(()=>{
        console.log("Salvo no MySQL")
        res.redirect('/home')
    })
})
router.post("/deletesf/:id", (req, res) =>{
    Software.destroy({
        where: {'id': req.params.id}
    }).then(() =>{
        res.redirect("/home")
    }).catch((err) =>{
        res.send('erro: '+err)
    })
})

const Game = sequelize.define('game',{
    img: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    preco_a_vista: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    preco_a_prazo: {
        type: Sequelize.STRING
    },
    parcelas: {
        type: Sequelize.STRING
    }
})
// Game.sync({force: true})
router.get("/newvideogame", (req,res)=>{ 
    Game.findAll({order: [['id', 'DESC']]}).then((produtos3)=>{
        res.render('./form/newgame',{produtos3})
    }) 
    // res.render('./form/newgame')
})
router.post("/newvideogame", function(req, res){
    const novoprod = req.body
    Game.create({
        img: novoprod.img,
        nome: novoprod.nome,
        preco_a_vista: novoprod.valor_a_vista,
        desc: novoprod.desc,
        preco_a_prazo: novoprod.valor_a_prazo,
        parcelas: novoprod.parcelas
    }).then(()=>{
        console.log("Salvo no MySQL")
        res.redirect('/home')
    })
})
router.post("/deletega/:id", (req, res) =>{
    Game.destroy({
        where: {'id': req.params.id}
    }).then(() =>{
        res.redirect("/home")
    }).catch((err) =>{
        res.send('erro: '+err)
    })
})

module.exports = router