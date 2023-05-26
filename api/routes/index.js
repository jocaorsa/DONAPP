const router = require('express').Router()
const { userRouter } = require('./user.router')
const { puntoextraccionRouter } = require('./puntoextraccion.router')
const { hemogrupoRouter } = require('./hemogrupo.router')
const { hemorhRouter } = require('./hemorh.router')
const { citaRouter } = require('./cita.router')
const { formularioRouter } = require('./formulario.router')
const { informeextraccionRouter } = require('./informeextraccion.router')
const authRouter = require('./auth.router')


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/cita', citaRouter )
router.use('/puntoextraccion', puntoextraccionRouter)
router.use('/informeextraccion', informeextraccionRouter)
router.use('/hemogrupo', hemogrupoRouter)
router.use('/hemorh', hemorhRouter)
router.use('/formulario', formularioRouter)




 module.exports =  router