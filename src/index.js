const express = require('express')
const dotenv = require("dotenv/config")
const router = require('./routes')


const app = express()
const PORT = process.env.PORT || 7070


app.use(express.json())
app.use(router)


app.listen(PORT, console.log(PORT))