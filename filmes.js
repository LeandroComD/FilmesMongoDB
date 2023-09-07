const mongoose = require('mongoose')
const Filme = mongoose.model('Filme', {
  titulo: String,
  sinopse: String,
  duracao: String,
  dataLncamento: String,
  imagem: String,
  categorias: String
})
module.exports = Filme