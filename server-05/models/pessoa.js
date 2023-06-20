const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
    name: { type: String, required: true },
    username:{type: String},
    email:{type: String, required: true},
    senha:{type: String, required: true},
    date:{type: Date, default: Date.now()}
});

module.exports = Pessoa = mongoose.model('Pessoa', PessoaSchema);