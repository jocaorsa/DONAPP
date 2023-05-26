const {
    getAllPuntoextracciones,
    getOnePuntoextraccion,
    createPuntoextraccion,
    updatePuntoextraccion,
    deletePuntoextraccion,
    getAllUserPuntoEager
} = require('../controllers/puntoextraccion.controller') 
const puntoextraccionRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth')
const { checkAdmin } = require('../../middlewares/roleCheck')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')


puntoextraccionRouter.get('/',checkAuth, checkDonante, getAllPuntoextracciones)
puntoextraccionRouter.get('/:id',checkAuth,checkSanitario, getOnePuntoextraccion)
puntoextraccionRouter.post('/', checkAuth, checkAdmin, createPuntoextraccion)
puntoextraccionRouter.put('/:id', checkAuth, checkAdmin, updatePuntoextraccion)
puntoextraccionRouter.delete('/:id', checkAuth, checkAdmin, deletePuntoextraccion)
puntoextraccionRouter.get('/:puntoextraccionId/eager', checkAuth, checkSanitario,getAllUserPuntoEager)

module.exports = {puntoextraccionRouter} 