const { sequelize } = require('../../database')
const { DataTypes } = require('sequelize')

const Hemogrupo = sequelize.define('hemogrupo', {
hemogrupo: {
    type: DataTypes.STRING,
    allowNull: false
}
})



module.exports =  Hemogrupo 