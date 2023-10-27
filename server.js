const express = require('express')
const app = express()
const cors = require('cors')

/**
 * SERVER CONFIGURATION
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '100mb' }))
app.use(cors())

app.use(require('./app/routes/index'))

const port = process.env.PORT || 80

/**
 * SERVER INITIALIZATION
 */

app.listen(port, () => {
    console.log(`[SERVER]: Starting server...`)
})
.on('listening', () => {
    console.log(`[SERVER]: Server started on ${port}`)
    console.log(`[SERVER]: Live on ${process.env.APP_URL}`)
})
.on('error', (err) => {
    console.log(`[SERVER]: Error trying to start the server on ${port}.`)
    console.log(err)
})
.on('close', () => {
    console.log(`[SERVER]: The server was closed.`)
})