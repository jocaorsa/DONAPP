const Informeextraccion = require('../models/informeextraccion.models')
const { Op } = require('sequelize')


async function getAllInformeextracciones(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const informeextracciones = await Informeextraccion.findAll({ paranoid: false })
            if (informeextraccion) {
                return res.status(200).json(informeextraccion)
            } else {
                return res.status(404).send('No Informe de extraccion found')
            }
        } else {
            const informeextraccion = await Informeextraccion.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (informeextraccion.length !== 0) {
                return res.status(200).json(informeextraccion)
            } else {
                return res.status(404).send('No informes found')
            }
        }
    } catch (error) {

        return res.status(500).send(error.message)
    }
}

async function getOneInformeextraccion(req, res) {
    try {
        const informeextraccion = await Informeextraccion.findByPk(req.params.id)
        if (informeextraccion) {
            return res.status(200).json(informeextraccion)
        } else {
            return res.status(404).send('Informe de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createInformeextraccion(req, res) {
    try {
        const informeextraccion = await Informeextraccion.create(
            req.body
        )
        return res.status(200).json({ message: 'Informe de extraccion created', informeextraccion: informeextraccion })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createInformeextraccionUser(req, res) {
    try {
        const informeextraccion = await Informeextraccion.create({
            userId: req.body.userId
        })
        return res.status(200).json({ message: 'Informe de extraccion created', informeextraccion: informeextraccion })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateInformeextraccionUser(req, res) {
    try {
        const [informeextraccionExist, informeextraccion] = await Informeextraccion.update(req.body, {
            returning: true,
            where: {
                userId: req.params.userId,
            },
        })
        if (informeextraccionExist !== 0) {
            return res.status(200).json({ message: 'Punto de extraccion updated', informeextraccion: informeextraccion })
        } else {
            return res.status(404).send('Informe de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteInformeextraccion(req, res) {
    try {
        const informeextraccion = await Informeextraccion.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (informeextraccion) {
            return res.status(200).json('Informe de extraccion deleted')
        } else {
            return res.status(404).send('Informe de extraccion not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
module.exports = {
    getAllInformeextracciones,
    getOneInformeextraccion,
    createInformeextraccionUser,
    updateInformeextraccionUser,
    deleteInformeextraccion,
    createInformeextraccion
}