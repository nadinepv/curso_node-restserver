const {Schema,model} = require('mongoose');

const ProductoSchema= new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado : {
        type:Boolean,
        default:true,
        require:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:String,
        default:true
    },
    imagen:{
        type:String
    },
});

ProductoSchema.methods.toJSON = function() {
    const {__v,estado, ...data} = this.toObject();
    return data;
}

module.exports= model('Producto',ProductoSchema);