const { response ,request} = require('express');

const usuarioGet =  (req=request, res=response) => {

    const {q,nombre='no name',apikey,page=1,limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuarioPost =  (req, res=response) => {

    const {nombre,edad}= req.body;

    res.json({
        msg: 'post API- Controlador',
        nombre,
        edad
    });
};

const usuarioPatch =  (req, res=response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};

const usuarioDelete =  (req, res= response) => {
    res.json({
        msg: 'delete API - controlador'
    });
};

const usuarioPut =  (req, res=response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuarioDelete,
    usuarioPut
}