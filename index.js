const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

// POST data
morgan.token('body', req => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body'))

// Get all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
        console.log(persons)
    })
})

// Info page
app.get('/info', (req, res) => {
    const time = new Date()
    const many = persons.length
    res.send(`<p>Phonebook has info for ${many} people</p><p>${time}</p>`)
})

// show one person from list
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// delete person from list
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    if (persons.length !== 0) {
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000) + 1
    return id
}

// Add new person to list
app.post('/api/persons', (req, res) => {

    const name = String(req.params.name)
    const body = req.body

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (body.name === name) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})