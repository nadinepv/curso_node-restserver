const { response ,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

// const Auth=  require('../models/auth');

const login = async (req,res=response) => {

    const {correo,password} = req.body;

    try {

        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario está activo

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            });
        }

        //verificar contraseña
        const validaPassword = bcryptjs.compareSync(password,usuario.password);

        if(!validaPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -password'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            msg:'Hable con el administrador'
        });
    }

}

module.exports={
    login
}