const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido,
        existeEmail,
        existeUsuarioPorID } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { usuarioGet, 
        usuarioPut, 
        usuarioPost, 
        usuarioDelete, 
        usuarioPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({min:6}),
    check('correo','Es correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRolValido),
    validarCampos
],usuarioPost);

router.delete('/:id',[  
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
],usuarioDelete);

router.patch('/', usuarioPatch);


module.exports = router;