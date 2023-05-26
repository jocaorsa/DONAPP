const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Cita = sequelize.define(
    'cita',
    {
        fecha_cita: {

            type: DataTypes.STRING,
            allowNull: false
        }
        /* hora_cita: {
            
            type: DataTypes.STRING,
            allowNull: false
        } */
    }

)

module.exports = Cita