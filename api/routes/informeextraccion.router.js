const {
    getAllInformeextracciones,
    getOneInformeextraccion,
    createInformeextraccionUser,
    updateInformeextraccionUser,
    createInformeextraccion,
    deleteInformeextraccion
} = require('../controllers/informeextraccion.controller')

const informeextraccionRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')




informeextraccionRouter.get('/', checkAuth, checkSanitario, getAllInformeextracciones)
informeextraccionRouter.get('/:id', checkAuth, checkDonante, getOneInformeextraccion)
informeextraccionRouter.post('/', checkAuth, checkSanitario, createInformeextraccion)
informeextraccionRouter.put('/:id', checkAuth, checkSanitario, updateInformeextraccionUser)
informeextraccionRouter.delete('/:id', checkAuth, checkSanitario, deleteInformeextraccion)

module.exports = { informeextraccionRouter }
