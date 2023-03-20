const { response ,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
const googleSignIn = async(req,res = response) => {
    
    const {id_token} = req.body;

    try {

        const {nombre,correo,imagen}= await googleVerify(id_token);

       let usuario = await Usuario.findOne({correo});

       if(!usuario){
            const data = {
                nombre,
                correo,
                password:':p',
                imagen,
                google:true,
                rol:'USER_ROLE'
            };

            usuario = new Usuario(data);
            await usuario.save();
       }

       if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador- usuario bloqueado'
            });
       }

    //Generar el JWT

        const token = await generarJWT(usuario.id);

         res.json({
            usuario,
            token
         })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }

 
}


module.exports={
    login,
    googleSignIn
}