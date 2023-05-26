const express = require('express')
require('dotenv').config()
const { sequelize, checkConnection, syncModels } = require('./database/index')
const addRelationsToModels = require('./database/relationships')
const router = require('./api/routes/index')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

const checkAndSync = async () => {
    try {
        await checkConnection()
        addRelationsToModels()
        await syncModels()
    } catch (error) {
        console.error(error)
    }
}

const start = async () => {
    try {
        app.use(cors())
        app.use(morgan('dev'))
        app.use(express.json())
        app.get('./', (req, res) => res.send('Welcome to '))
        app.use('/api', router)
        await app.listen(process.env.PORT || '2222')
        await checkAndSync()
        console.log('Api running ')
    } catch (error) {
        console.log(error)
    }
}

start()