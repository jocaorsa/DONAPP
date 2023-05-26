const {
    getAllCitas,
    getOneCita,
    createCita,
    updateCita,
    deleteCita
} = require('../controllers/cita.controller')
const citaRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')

citaRouter.get('/',checkAuth, checkSanitario,getAllCitas)
citaRouter.get('/:id',checkAuth, checkDonante, getOneCita)
citaRouter.post('/', checkAuth, checkDonante, createCita)
citaRouter.put('/:id', checkAuth, checkDonante, updateCita)
citaRouter.delete('/:id', checkAuth, checkDonante, deleteCita)
module.exports = { citaRouter }