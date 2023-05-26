const User = require('../api/models/user.models')
const Informeextraccion = require('../api/models/informeextraccion.models')
const Cita = require('../api/models/cita.models')
const Puntoeextraccion = require('../api/models/puntoextraccion.models')
const Formulario = require('../api/models/formulario.models')
const Hemogrupo = require('../api/models/hemogrupo.model')
const Hemorh = require('../api/models/hemorh.model')
const Citapunto = require('../api/models/citapunto.models')

function addRelationsToModels() {
    try {
        // One To One
        User.hasOne(Informeextraccion)
        Informeextraccion.belongsTo(User)
        Formulario.hasOne(Cita)
        Cita.belongsTo(Formulario)

        //One To Many
        //"sanitario"."sanitario_id" < "informe_extraccion"."sanitario_id"
        Informeextraccion.belongsTo(User)
        User.hasMany(Informeextraccion)
        //"informe_extraccion"."punto_estraccion_id" > "punto_extraccion"."punto_extraccion_id"
        Informeextraccion.belongsTo(Puntoeextraccion)
        Puntoeextraccion.hasMany(Informeextraccion)
        //"Hemorh"."hemorh_id" < "donante"."hemorh_id"
        Hemorh.hasMany(User)
        User.belongsTo(Hemorh)
        //"Hemogrupo"."hemotipo" < "donante"."hemotipo_id"
        Hemogrupo.hasMany(User)
        User.belongsTo(Hemogrupo)
        //"cita"."donante_id" < "donante"."donante_id"
        Cita.belongsTo(User)
        User.hasMany(Cita)
        //// Many to Many
        //"cita"."punto_extraccion_id" <> "punto_extraccion"."punto_extraccion_id"
        Cita.belongsToMany(Puntoeextraccion, { through: 'citapunto', foreignKey: 'citaId' })
        Puntoeextraccion.belongsToMany(Cita, { through: 'citapunto' })
        //"sanitario"."sanitario_id" <> "punto_extraccion"."sanitario_id"
        User.belongsToMany(Puntoeextraccion, { through: 'userpunto' })
        Puntoeextraccion.belongsToMany(User, { through: 'userpunto' })
        //"cita"."informe_id" <> "informe_extraccion"."informe_id"
        Cita.belongsToMany(Informeextraccion, { through: 'citainforme', foreignKey: 'citaId' })
        Informeextraccion.belongsToMany(Cita, { through: 'citainforme' })

        console.log('Relations added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelationsToModels