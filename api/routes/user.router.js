const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getOneUserEager,
    addUserCita,
    addUserHemorh,
    addUserHemogrupo,
    getUserCitaEager, 
    getOneSanitarioEager
} = require('../controllers/user.controller')
const { createInformeextraccion }= require('../controllers/informeextraccion.controller')
const userRouter = require('express').Router()
const { checkAuth, checkAdmin, checkSanitario, checkDonante } = require('../../middlewares/auth')

/// SANIUTARIO ADD INFORME
userRouter.post('/:userId/informeextraccion/add/:informeextraccionId', checkAuth, checkSanitario,createInformeextraccion)


userRouter.get('/', checkAuth, checkSanitario, getAllUsers)
userRouter.get('/:id', checkAuth, checkDonante, getOneUser)
userRouter.get('/:userId/eager', checkAuth, checkDonante, getUserCitaEager)
userRouter.get('/:userId/cita/eager', checkAuth, checkDonante, getOneUserEager)
userRouter.get('/:userId/puntoextraccion/eager', checkAuth, checkSanitario, getOneSanitarioEager)
userRouter.put('/:id', checkAuth, checkSanitario, updateUser)
userRouter.post('/', checkAuth, checkAdmin, createUser)
userRouter.post('/:userId/hemorh/:hemorhId', checkAuth, checkSanitario, addUserHemorh)
userRouter.post('/:userId/hemogrupo/:hemogrupoId', checkAuth, checkSanitario, addUserHemogrupo)
userRouter.post('/cita/:citaId', checkAuth, checkDonante, addUserCita)
userRouter.delete('/:id', checkAuth, checkDonante, deleteUser)


module.exports = { userRouter } 
