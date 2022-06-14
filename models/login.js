const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Login = new Schema({
    nome:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
    },
    senha:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

Login.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash; // Objeto que está sendo salvo
    next();
})

const User = mongoose.model('login',  Login);
module.exports = User;