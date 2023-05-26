const Informeextraccion = require('../models/informeextraccion.models')
const Puntoextraccion = require('../models/puntoextraccion.models')
const User = require('../models/user.models')
const Cita = require('../models/cita.models')
const Hemorh = require('../models/hemorh.model')
const Hemogrupo = require('../models/hemogrupo.model')


const { Op } = require('sequelize')


async function getAllUsers(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const users = await User.findAll({ paranoid: false })
            if (users) {
                return res.status(200).json(users)
            } else {
                return res.status(404).send('No Users found')
            }
        } else {
            const users = await User.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (users.length !== 0) {
                return res.status(200).json(users)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

///GET USER DESPUES DEL LOGIN

async function getOneUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('user not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(
            req.body
        )
        return res.status(200).json({ message: 'User created', user: user })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        const [userExist, user] = await User.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (userExist !== 0) {
            return res.status(200).json({ message: 'User updated', user: user })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (user) {
            return res.status(200).json('User deleted')
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllUserEager(req, res) {
    try {
        const result = await User.findOne({
            include: [Informeextraccion, Puntoextraccion,],
            where: {
                id: req.params.userId
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
async function addUserCita(req, res) {
    req.body.userId = res.locals.user.id
    try {
        const cita = await Cita.create(
            req.body
        )
        const puntoextraccion = await cita.addPuntoextraccions(req.body.punto_extraccion)
        const result = await Cita.findByPk(cita.id,
            {
                include: [
                    { model: Puntoextraccion, attributes: ["loc_gps"]},
                    { model: User, attributes: ["email"]}]

            })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function addUserHemogrupo(req, res) {
    console.log(req.params.userId)
    try {
        const user = await User.findByPk(req.params.userId)
        console.log(user)
        const result = await user.addHemogrupo(req.params.hemogrupoId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function addUserHemorh(req, res) {
    console.log(req.params.userId)
    try {
        const user = await User.findByPk(req.params.userId)
        console.log(user)
        const result = await user.addHemorh(req.params.hemorhId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function getUserCitaEager(req, res) {
    try {
        const result = await User.findOne({
            include: [Cita],
            where: {
                id: req.params.userId
            }
        })
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(404).send('No users found')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}
async function getOneUserEager(req, res) {
    try {
        const result = await User.findOne({
            include: [Cita, Hemorh, Hemogrupo, Informeextraccion, Puntoextraccion],
            where: {
                id: req.params.userId
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
async function getOneSanitarioEager(req, res) {
    try {
        const result = await User.findOne({
            include: [Puntoextraccion],
            where: {
                id: req.params.userId
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
}

