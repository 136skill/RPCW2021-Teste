var Ligacao =  require('../models/ligacao')
var Cidade =  require('../models/cidade')


module.exports.listarLiga = () => {
    return Ligacao.find().exec()
}

module.exports.listarCidade = () => {
    return Cidade.find({},{ _id:0, id: 1, nome:1, distrito:1}).sort().exec()
}

module.exports.listarCidade2 = () => {
    return Cidade.find().sort().exec()
}

module.exports.lookupCidade = i => {
    return Cidade.findOne({id: i}).exec()
}

module.exports.listarPorNomeCidade = () => {
    return Cidade.find({},{_id:0,nome:1}).exec()
}



module.exports.listarPorDistritoCidade = d => {
    return Cidade.find({distrito:d},{_id:0,id:1,nome:1}).exec()
}

module.exports.listarPorOrigem = n => {
    var origens= Ligacao.find({origem:n}, {id: 1, destino:1}).sort().exec()
    return origens
}

module.exports.listaDistancia = () => {
    return Ligacao.find({}, { _id: 0, id: 1, origem: 1, destino: 1, distancia: 1 }).exec()
}