const Puntoextraccion = require('../models/puntoextraccion.models')
const User = require('../models/user.models')
const Cita = require('../models/cita.models')
const Informeextraccion = require('../models/informeextraccion.models')
const { Op } = require('sequelize')


async function getAllPuntoextracciones(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const puntoextracciones = await Puntoextraccion.findAll({ paranoid: false })
            if (puntoextracciones) {
                return res.status(200).json(puntoextracciones)
            } else {
                return res.status(404).send('No Punto de extraccion found')
            }
        } else {
            const puntoextracciones = await Puntoextraccion.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (puntoextracciones.length !== 0) {
                return res.status(200).json(puntoextracciones)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOnePuntoextraccion(req, res) {
    try {
        const puntoextraccion = await Puntoextraccion.findByPk(req.params.id)
        if (puntoextraccion) {
            return res.status(200).json(puntoextraccion)
        } else {
            return res.status(404).send('Punto de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createPuntoextraccion(req, res) {
    try {
        const puntoextraccion = await Puntoextraccion.create(
             req.body
        )
        return res.status(200).json({ message: 'Punto de extraccion created', puntoextraccion: puntoextraccion })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updatePuntoextraccion(req, res) {
    try {
        const [puntoextraccionExist, puntoextraccion] = await Puntoextraccion.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (puntoextraccionExist !== 0) {
            return res.status(200).json({ message: 'Punto de extraccion updated', puntoextraccion: puntoextraccion })
        } else {
            return res.status(404).send('Punto de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePuntoextraccion(req, res) {
    try {
        const puntoextraccion = await Puntoextraccion.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (puntoextraccion) {
            return res.status(200).json('Punto de extraccion deleted')
        } else {
            return res.status(404).send('Punto de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
async function getAllUserPuntoEager(req, res) {
    try {
        const result = await Puntoextraccion.findOne({
            include: [Cita, User, Informeextraccion],
            where: {
                id: req.params.puntoextraccionId
            }
        })
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(404).send('No User found')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}





module.exports = {
    getAllPuntoextracciones,
    getOnePuntoextraccion,
    createPuntoextraccion,
    updatePuntoextraccion,
    deletePuntoextraccion,
    getAllUserPuntoEager
}