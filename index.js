import express from 'express'
import _ from 'lodash'

const app = express()
const PORT = 8000

let chocolates = [
    {
        id: 1,
        name: "Шоколад «Альпен Гольд» молочный",
        flavor: "Молочный",
        weight: 90,
        price: 120,
        country: "Россия"
    },
    {
        id: 2,
        name: "Шоколад «Ritter Sport» с орехами",
        flavor: "Молочный с лесным орехом",
        weight: 100,
        price: 220,
        country: "Германия"
    },
    {
        id: 3,
        name: "Шоколад «Аленка»",
        flavor: "Сладкий",
        weight: 100,
        price: 250,
        country: "Россия"
    },
    {
        id: 4,
        name: "Шоколад «Milka Oreo»",
        flavor: "Молочный с печеньем Oreo",
        weight: 92,
        price: 200,
        country: "Германия"
    },
    {
        id: 5,
        name: "Шоколад «Россия щедрая душа»",
        flavor: "Молочный с фундуком",
        weight: 100,
        price: 110,
        country: "Россия"
    }
]

app.use(express.json())

// Получить список всех шоколадов
app.get('/chocolates/', (req, res) => {
    res.status(200).json(chocolates)
})

// Получить шоколад по id
app.get('/chocolates/:id', (req, res) => {
    const chocolate = chocolates.find(ch => ch.id == req.params.id)

    if (_.isUndefined(chocolate)) {
        return res.status(404).json({ error: 'Chocolate does not exist' })
    }

    res.status(200).json(chocolate)
})

// Добавить шоколад
app.post('/post/', (req, res) => {
    const newChocolate = {
        id: _.last(chocolates).id + 1,
        name: req.body.name,
        flavor: req.body.flavor,
        weight: req.body.weight,
        price: req.body.price,
        country: req.body.country
    }

    chocolates.push(newChocolate)

    res.status(201).json(newChocolate)
})

// Обновить шоколад по id
app.put('/put/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = chocolates.findIndex(ch => ch.id === id)

    if (index === -1) {
        return res.status(404).json({ error: 'Chocolate does not exist' })
    }

    chocolates[index] = { ...chocolates[index], ...req.body, id }

    res.json(chocolates[index])
})

// Удалить шоколад по id
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = chocolates.findIndex(ch => ch.id === id)

    if (index === -1) {
        return res.status(404).json({ error: 'Chocolate does not exist' })
    }

    const deleted = chocolates.splice(index, 1)
    res.json(deleted[0])
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})