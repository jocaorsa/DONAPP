const {
    getAllFormularios,
    getOneFormulario,
    createFormulario,
    updateFormulario,
    deleteFormulario
} = require('../controllers/formulario.controller')

const formularioRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')
const { checkAdmin } = require('../../middlewares/roleCheck')

formularioRouter.get('/', checkAuth, checkSanitario, getAllFormularios)
formularioRouter.get('/:id', checkAuth, checkDonante, getOneFormulario)
formularioRouter.post('/', checkAuth, checkDonante, createFormulario)
formularioRouter.put('/:id', checkAuth, checkDonante, updateFormulario)
formularioRouter.delete('/:id', checkAuth, checkAdmin, deleteFormulario)
module.exports = { formularioRouter }