const { sequelize } = require('../../database')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM ('Donante','Sanitario','Admin'),
        allowNull: false,
        defaultValue: 'Donante'
    }
},
{
    createdAt: false,
    updatedAt: false
}
)

module.exports =  User 
 