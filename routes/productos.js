const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, productosGet, productoGetByID,actualizarProducto ,eliminarProducto} = require('../controllers/productos');
const { existeCategoriaByID, existeProductoByID } = require('../helpers/db-validators');
const { validarJWT, validarCampos,esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas los productos-publico
router.get('/',productosGet)

//Obtener un producto - publico

router.get('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeProductoByID),
    validarCampos
],productoGetByID)

//Crear un producto - privado - cualquier persona con token válido

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaByID),
    validarCampos
],crearProducto)

//Actualizar producto - priva- cualquier persona co token válido

router.put('/:id',[
    validarJWT,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeProductoByID),
    //check('categoria','No es un id de mongo válido').isMongoId(),
    //check('categoria').custom(existeCategoriaByID),
    validarCampos
],actualizarProducto)

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeProductoByID),
    validarCampos
],eliminarProducto)


module.exports =router;