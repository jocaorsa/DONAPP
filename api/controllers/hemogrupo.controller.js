const Hemogrupo = require('../models/hemogrupo.model')
const { Op } = require('sequelize')


async function getAllHemogrupos(req, res) {
     try {
        if (!Object.values(req.query).length) {
            const hemogrupos = await Hemogrupo.findAll({ paranoid: false })
            if  (hemogrupos) {
                return res.status(200).json (hemogrupos)
            } else {
                return res.status(404).send('No Hemogrupo found')
            }
        } else {
            const hemogrupos = await Hemogrupo.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (hemogrupos.length !== 0) {
                return res.status(200).json(hemogrupos)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneHemogrupo(req, res) {
    try {
        const hemogrupo = await Hemogrupo.findByPk(req.params.id)
        if (hemogrupo) {
            return res.status(200).json(hemogrupo)
        } else {
            return res.status(404).send('Hemogrupo not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createHemogrupo(req, res) {
    try {
        const hemogrupo = await Hemogrupo.create(
            req.body
        )
        return res.status(200).json({ message: 'Hemogrupo created', hemogrupo: hemogrupo })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateHemogrupo(req, res) {
    try {
        const [hemogrupoExist, hemogrupo] = await Hemogrupo.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (hemogrupoExist !== 0) {
            return res.status(200).json({ message: 'Hemogrupo updated', hemogrupo: hemogrupo })
        } else {
            return res.status(404).send('Hemogrupo not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteHemogrupo(req, res) {
    try {
        const hemogrupo = await Hemogrupo.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (hemogrupo) {
            return res.status(200).json('Hemogrupo deleted')
        } else {
            return res.status(404).send('Hemogrupo not found')
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
    getAllHemogrupos,
    getOneHemogrupo,
    createHemogrupo,
    updateHemogrupo,
    deleteHemogrupo
    //getAllCitas,
    //getOneCita,
    //createCita,
    //updateCita,
    //deleteCita,
    //getAllCitaLazy,
    //getAllCitaEager,
    //addCitaToMovie,
    //deleteCitaFromMovie
}