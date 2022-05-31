var express = require('express');
var router = express.Router();
var Mapa = require('../controllers/mapa');


router.get('/cidades', function(req,res){
  if(req.query['distrito'] != undefined){
    Mapa.listarPorDistritoCidade(req.query['distrito'])
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
  }
  else {
  Mapa.listarCidade()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
  }
})

router.get('/ligacoes', function (req, res, next) {
  if (req.query['origem']) {
    Mapa.listarCidade()
      .then(data => {
        var city = {}
        data.forEach(c => {
          city[c.id] = c.nome})
        Mapa.listarPorOrigem(req.query['origem'])
          .then(dados => {
            var final = []
            dados.forEach(o => {
              final.push({ 'id': o.id, 'destino': o.destino, 'nome': city[o.destino] })
            })
            res.status(200).jsonp(final)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }
  else{
    Mapa.listarCidade()
      .then(data => {
        var city = {}
        data.forEach(c =>{
           city[c.id] = c.nome}
           )
        Mapa.listaDistancia()
          .then(dados => {
            var final = []
            dados.forEach(o => {
              if (o.distancia >= req.query['dist']) {
                final.push({ 'id': o.id, 'idOrigem': o.origem, 'nomeOrigem': city[o.origem], 'idDestino': o.destino, 'nomeDestino': city[o.destino] })
              }
            })
            res.status(200).jsonp(final)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }
})




router.get('/cidades/nomes', function(req,res){
  Mapa.listarPorNomeCidade()
  .then(dados => {
    var final = []
    dados.forEach( d => {
      final.push(d['nome'])
    })
    final.sort()
    res.status(200).jsonp(final)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/distritos', function(req,res){
  Mapa.listarCidade2()
  .then(dados => {
    var city = {}
    dados.forEach(d => {
      if(city[d['distrito']] == undefined){
        city[d['distrito']] = [{id: d['id'], cidade:d['nome']}]
      }
      else {
        city[d['distrito']].push({id: d['id'], cidade:d['nome']})
      }
    })
    res.status(200).jsonp(city)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/cidades/:id', function(req,res){
  Mapa.lookupCidade(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})



module.exports = router;
