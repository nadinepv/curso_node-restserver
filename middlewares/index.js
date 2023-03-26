
const  validarCampos = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validaRoles = require('../middlewares/validar-rojes');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo
}

