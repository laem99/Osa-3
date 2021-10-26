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

//Address doens't exist
const unknownEndpoint = (error, request, response, next) => {
    response.status(404).send({ error: 'address doesn`t exist' })
    next(error)
}

// Get all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
})

// Info page
app.get('/info', (req, res, next) => {
    const time = new Date()
    const test = Person.find({}).then(data => res.send(`<p>Phonebook has info for ${data.length} people</p><p>${time}</p>`)).catch(error => next(error))
})

// show one person from list
app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Error occured while trying to delete or post persons' })
    } else if (error.name === 'ValidationError') {
        return response.status(409).json({ error: error.message })
    }

    next(error)
}

// delete person from list
app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000) + 1
    return id
}

// Add new person to list
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person
        .save()
        .then(savedPerson => {
            return savedPerson.toJSON()
        })
        .then(savedAndFormattedPerson => {
            return res.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {

    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})