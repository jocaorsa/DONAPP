const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Formulario = sequelize.define(
    'formulario',
    {
       respuesta: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
)

module.exports = Formulario