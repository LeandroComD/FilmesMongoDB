const express = require('express')
const mongoose = require('mongoose')
const Filme = require('./models/filmes')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.post('/person', async (req, res) => {
    const { titulo,
        sinopse,
        duracao,
        dataLncamento,
        imagem,
        categorias } = req.body
    const person = {
        titulo,
        sinopse,
        duracao,
        dataLncamento,
        imagem,
    }
    try {
      await Filme.create(person)
      res.status(201).json({ message: 'Filme inserido no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.get('/person', async (req, res) => {
    try {
      const people = await Filme.find()
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })  

  app.get('/person/:id', async (req, res) => {
    const id = req.params.id
    try {
      const person = await Filme.findOne({ _id: id })
      if (!person) {
        res.status(422).json({ message: 'Filme não encontrado!' })
        return
      }
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
    const { titulo,
        sinopse,
        duracao,
        dataLncamento,
        imagem,
        categorias } = req.body
    const person = {
        titulo,
        sinopse,
        duracao,
        dataLncamento,
        imagem,
        categorias
    }
    try {
      const updatedPerson = await Filme.updateOne({ _id: id }, person)
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Filme não encontrado!' })
        return
      }
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
    const person = await Filme.findOne({ _id: id })
    if (!person) {
      res.status(422).json({ message: 'Filme não encontrado!' })
      return
    }
    try {
      await Filme.deleteOne({ _id: id })
      res.status(200).json({ message: 'Filme removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }) 
app.get("/", (req, res) => {  //criando a rota - endpoint
    res.json({ message: "Oi Express!" });
  });
  mongoose.connect(
    'mongodb+srv://leandrosalesk:Crocodile2@aula.asqkulf.mongodb.net/Filme?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))