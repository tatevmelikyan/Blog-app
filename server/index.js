import express from 'express'

const port = process.env.PORT

const app = express()
app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(port || 3001, () => {
    console.log(`App is running on port ${port}`)
})