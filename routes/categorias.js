const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, categoriasGet, categoriaGetbyID, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const { existeCategoriaByID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//Obtener todas las categorias-publico
router.get('/',categoriasGet)

//Obtener una categoria - publico
router.get('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaByID),
    validarCampos
],categoriaGetbyID)

//Crear una categoria - privado - cualquier persona con token válido
router.post('/',[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar categoria - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaByID),
    validarCampos
],categoriaPut)

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaByID),
    validarCampos
],categoriaDelete)

module.exports=router;

