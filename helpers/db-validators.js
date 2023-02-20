const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
};

const existeEmail = async (correo = '') => {

    const existeCorreo =await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`);
    }

}

const existeUsuarioPorID= async (id ) => {

    const existeID =await Usuario.findById(id);
    if (!existeID) {
        throw new Error(`No existe el id:  ${correo}`);
    }

}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID
}