const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Puntoextraccion = sequelize.define(
    'puntoextraccion',
    {
        loc_gps: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion: { // fijo ,movil
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion_isla: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion_direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion_tlf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pextraccion_horario: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    
)

module.exports = Puntoextraccion