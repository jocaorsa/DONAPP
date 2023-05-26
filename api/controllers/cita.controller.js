const Cita = require('../models/cita.models')
const { Op } = require('sequelize')


async function getAllCitas(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const citas = await Cita.findAll({ paranoid: false })
            if (citas) {
                return res.status(200).json(citas)
            } else {
                return res.status(404).send('No Citas found')
            }
        } else {
            const citas = await Cita.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (citas.length !== 0) {
                return res.status(200).json(citas)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneCita(req, res) {
    try {
        const cita = await Cita.findByPk(req.params.id)
        if (cita) {
            return res.status(200).json(cita)
        } else {
            return res.status(404).send('cita not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createCita(req, res) {
    try {
       
        const cita = await Cita.create(
            req.body
        )
        return res.status(200).json({ message: 'Cita created', cita: cita })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateCita(req, res) {
    try {
        const [citaExist, cita] = await Cita.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (citaExist !== 0) {
            return res.status(200).json({ message: 'Cita updated', cita: cita })
        } else {
            return res.status(404).send('Cita not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteCita(req, res) {
    try {
        const cita = await Cita.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (cita) {
            return res.status(200).json('Cita deleted')
        } else {
            return res.status(404).send('Cita not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}



module.exports = {
    getAllCitas,
    getOneCita,
    createCita,
    updateCita,
    deleteCita
}