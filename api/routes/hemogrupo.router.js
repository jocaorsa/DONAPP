const {
    getAllHemogrupos,
    getOneHemogrupo,
    createHemogrupo,
    updateHemogrupo,
    deleteHemogrupo
} = require('../controllers/hemogrupo.controller')
const hemogrupoRouter = require('express').Router()
const {checkAuth} = require('../../middlewares/auth')
const { checkSanitario } = require('../../middlewares/roleCheck')
const { checkDonante } = require('../../middlewares/roleCheck')


hemogrupoRouter.get('/',checkAuth,checkSanitario,getAllHemogrupos)
hemogrupoRouter.get('/:id',checkAuth, checkDonante,getOneHemogrupo)
hemogrupoRouter.post('/',checkAuth,checkSanitario, createHemogrupo)
hemogrupoRouter.put('/:id',checkAuth,checkSanitario, updateHemogrupo)
hemogrupoRouter.delete('/:id',checkAuth,checkSanitario, deleteHemogrupo)
module.exports = { hemogrupoRouter }