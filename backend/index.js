const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')
const path = require('path')

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": "4"
  }
]

app.use(cors());
app.use(express.json());

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/', express.static(path.join(__dirname, 'dist')))

app.get('/api/persons', (req, res) => {
  return res.json(persons)
})

app.get('/info', (req, res) => {
  const content = `<p>Phonebook has info for ${persons.length} people.</p><p>${new Date().toString()}</p>`;
  return res.send(content)
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  let oldLen = persons.length;
  persons = persons.filter(p => p.id !== req.params.id);
  if (persons.length !== oldLen) {
    return res.status(200).json(persons);
  }
  else {
    res.status(204).send("Person not found");
  }
})

// Should validate using schemas
app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;
  if (!name) {
    return res.status(400).send("Name must not be empty")
  }
  if (!number) {
    return res.status(400).send("Number must not be empty");
  }
  const existingName = persons.find(p => p.name === name)
  if (existingName) {
    return res.status(400).send("Name must be unique")
  }
  const id = Math.floor(Math.random() * 100000);
  persons.push({name, number, id});
  return res.status(201).json({name, number, id});
})

app.put('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id == req.params.id);
  if (person) {
    persons = persons.map(p => p.id == req.params.id ? person : p);
    return res.json(person);
  }
  else {
    return res.status(404).send("Person not found");
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})