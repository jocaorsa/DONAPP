const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Informeextraccion = sequelize.define(
    'informeextraccion',
    {
        analitica: {
            type: DataTypes.STRING,
            allowNull: false
        },
        extraccion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        comentario:{
            type: DataTypes.TEXT
        }
    }

)

module.exports = Informeextraccion