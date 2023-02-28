const { response ,request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario=  require('../models/usuario');

const usuarioGet =  async(req=request, res=response) => {

    //const {q,nombre='no name',apikey,page=1,limit} = req.query;

    const query = {estado:true};

    const {limite  = 5,desde=0} = req.query;

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                        .skip(Number(desde))
                        .limit(Number(limite))
    ]);

    // const ususario = await Usuario.find(query)
    //                     .skip(Number(desde))
    //                     .limit(Number(limite));

    // const total= await Usuario.countDocuments(querys);

    res.json({
        total,
        usuarios
    });
};

const usuarioPost =  async(req, res=response) => {

    const {nombre,correo,password,rol}= req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);

    //guardar la constraseña
    await usuario.save();

    res.json({
        msg: 'post API- Controlador',
        usuario
    });
};

const usuarioPatch =  (req, res=response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};

const usuarioDelete =  async(req, res= response) => {

    const {id} = req.params;

    //borramos fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    const usuarioAutenticado = req.usuario;
    
    res.json({
        usuario
    });
};

const usuarioPut =  async(req, res=response) => {

    const {id} = req.params;

    const {_id,password,google,correo, ...resto} = req.body;

    //TODO validar contra base de datos

    if(password){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);  
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuarioDelete,
    usuarioPut
}