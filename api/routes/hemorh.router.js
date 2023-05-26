const {
    getAllHemorhs,
    getOneHemorh,
    createHemorh,
    updateHemorh,
    deleteHemorh
} = require('../controllers/hemorh.controller')
const hemorhRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')



hemorhRouter.get('/', checkAuth, checkSanitario, getAllHemorhs)
hemorhRouter.get('/:id', checkAuth, checkDonante, getOneHemorh)
hemorhRouter.post('/', checkAuth, checkSanitario, createHemorh)
hemorhRouter.put('/:id', checkAuth, checkSanitario, updateHemorh)
hemorhRouter.delete('/:id', checkAuth, checkSanitario, deleteHemorh)

module.exports = { hemorhRouter }