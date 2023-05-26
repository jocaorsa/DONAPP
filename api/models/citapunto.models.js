const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Citapunto = sequelize.define(
    'citapunto',
    {
        citaId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    }

)

module.exports = Citapunto