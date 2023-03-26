const Role = require('../models/role');
const {Usuario,Categoria, Producto}  = require('../models');

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
        throw new Error(`No existe el id:  ${id}`);
    }

}

const existeCategoriaByID = async(id) => {

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`No existe el id:  ${id}`);
    }

}

const existeProductoByID = async(id)=>{

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`No existe el id: ${id}`);
    }
}

/**Validar Colecciones permitidas */

const coleccionesPermitidas = async(coleccion='',colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no está incluida - ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaByID,
    existeProductoByID,
    coleccionesPermitidas
}