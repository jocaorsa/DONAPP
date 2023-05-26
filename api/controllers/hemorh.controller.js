const Hemorh = require('../models/hemorh.model')
const { Op } = require('sequelize')


async function getAllHemorhs(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const citas = await Hemorh.findAll({ paranoid: false })
            if (citas) {
                return res.status(200).json(citas)
            } else {
                return res.status(404).send('No Hemorh found')
            }
        } else {
            const citas = await Hemorh.findAll({
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

async function getOneHemorh(req, res) {
    try {
        const cita = await Hemorh.findByPk(req.params.id)
        if (cita) {
            return res.status(200).json(cita)
        } else {
            return res.status(404).send('Hemorh not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createHemorh(req, res) {
    try {
        const cita = await Hemorh.create(
            req.body
        )
        return res.status(200).json({ message: 'Hemorh created', cita: cita })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateHemorh(req, res) {
    try {
        const [citaExist, cita] = await Hemorh.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (citaExist !== 0) {
            return res.status(200).json({ message: 'Hemorh updated', cita: cita })
        } else {
            return res.status(404).send('Hemorh not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteHemorh(req, res) {
    try {
        const cita = await Hemorh.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (cita) {
            return res.status(200).json('Hemorh deleted')
        } else {
            return res.status(404).send('Hemorh not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
/*
async function getAllCitaLazy(req, res) {
    try {
        const cita = await Cita.findByPk(req.params.citaId);
        if (cita) {
            const concat = await cita.getMovies()
            return res.status(200).json(concat)
        } else {
            return res.status(404).send('No Cita found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
async function getAllCitaEager(req, res) {
    try {
        const result = await Cita.findOne({
            include: [
                {
                    model: Movie,
                    through: { attributes: [] }
                }
            ],
            where: {
                id: req.params.citaId
            },
            include: Movie
        });
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(404).send('No Cita found')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function addCitaToMovie(req, res) {
    try {
        const cita = await Cita.findByPk(req.params.citaId)
        //const movie = await Movie.findByPk(req.params.movieId)
        const result = await cita.addMovie(movie)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteCitaFromMovie(req, res) {
    try {
        const cita = await Cita.findByPk(req.params.citaId)
        //const movie = await Movie.findByPk(req.params.movieId)
        const result = await cita.removeMovie(movie)
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
*/
module.exports = {
    getAllHemorhs,
    getOneHemorh,
    createHemorh,
    updateHemorh,
    deleteHemorh
    
}
