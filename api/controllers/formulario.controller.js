const Formulario = require('../models/formulario.models')
const { Op } = require('sequelize')


async function getAllFormularios(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const formularios = await Formulario.findAll({ paranoid: false })
            if (formularios) {
                return res.status(200).json(formularios)
            } else {
                return res.status(404).send('No Formulario found')
            }
        } else {
            const formularios = await Formulario.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (formularios.length !== 0) {
                return res.status(200).json(formularios)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneFormulario(req, res) {
    try {
        const formulario = await Formulario.findByPk(req.params.id)
        if (formulario) {
            return res.status(200).json(formulario)
        } else {
            return res.status(404).send('Formulario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createFormulario(req, res) {
    try {
        const formulario = await Formulario.create(
            req.body
        )
        return res.status(200).json({ message: 'Formulario created', formulario: formulario })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateFormulario(req, res) {
    try {
        const [formularioExist, formulario] = await Formulario.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (formularioExist !== 0) {
            return res.status(200).json({ message: 'Formulario updated', formulario: formulario })
        } else {
            return res.status(404).send('Formulario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteFormulario(req, res) {
    try {
        const formulario = await Formulario.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (formulario) {
            return res.status(200).json('Formulario deleted')
        } else {
            return res.status(404).send('Formulario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
module.exports = {
    getAllFormularios,
    getOneFormulario,
    createFormulario,
    updateFormulario,
    deleteFormulario
 
}