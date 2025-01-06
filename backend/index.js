require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/', express.static(path.join(__dirname, 'dist')))

app.get('/info', async (req, res, next) => {
  try {
    const count = await Person.countDocuments({})
    const content = `<p>Phonebook has info for ${count} people.</p><p>${new Date().toString()}</p>`
    return res.send(content)
  }
  catch(e) {
    next(e)
  }
})

app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    return res.json(persons)
  }
  catch(e) {
    next(e)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      return res.json(person)
    }
    else {
      return res.status(404).send('Person not found')
    }
  }
  catch(e) {
    next(e)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id)
    return res.json(result)
  }
  catch(e) {
    next(e)
  }
})

// Should validate using schemas
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  try {
    const existingPerson = await Person.findOne({ name: req.params.name })
    if (existingPerson) {
      return res.status(400).send('Name must be unique')
    }
    const addedPerson = await new Person({ name, number }).save()
    return res.status(201).json(addedPerson)
  }
  catch(e) {
    next(e)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { number } = req.body
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, { number }, { new: true, runValidators: true, context: 'query' })
    if (!person) {
      return res.status(404).send('Person not found')
    }
    else {
      return res.json(person)
    }
  }
  catch (e) {
    next(e)
  }
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})