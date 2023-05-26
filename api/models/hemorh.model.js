const { sequelize } = require('../../database')
const { DataTypes } = require('sequelize')

const Hemorh = sequelize.define('hemorh', {
hemorh: {
    type: DataTypes.STRING,
    allowNull: false,
    
}
})



module.exports = Hemorh 