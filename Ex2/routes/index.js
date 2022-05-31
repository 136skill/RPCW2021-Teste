var express = require('express');
var router = express.Router();
var axios = require('axios');


apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNDk0NSwiZXhwIjoxNjU0MDQzNzQ1fQ.O6gNwOIe-IrK-EAOfxbgg-WIV5fFLbJobG9p1r0swvf0xivHp5jsw7mqcBxv42RT2OwU5MMei2k68D3sE8Y8qurZQO37-p3v0PJcPLUg4_nXjRe7eUTVCwTlgRrdkijE5ig8M81OWYT_taKjCRqKoeTCNCbn2HfT0iiytjTbMZrmJnrQSP-qbx3694wJzxP7C_8QPYAuxMfydlWj9g3kuLsDNInXbj3csnq7reotn0gpOWagcDgCzxcDJj84ytArC9mWSjqdKrq6SjfwF9T6Vaeg7oj032-uCkKXaQORAvOXuwQummYohgMSmiJS8gAXQTJK3vSQwP67TZxl1dGXLA"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial' });
});

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + apikey)
    .then(response => {
      var lista = response.data
      //dados -> o nome que passa para o pug
      // lista -> o que se obtem da response
      res.render('nivel1', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});


router.get('/classes/:code', function(req, res, next) {
  al = req.params.code
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + al + "?token=" + apikey)
    .then(response => {
      var lista = response.data
      //dados -> o nome que passa para o pug
      // lista -> o que se obtem da response
      res.render('classes', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

router.get('/termos', function(req, res, next) {
  al = req.params.code
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + apikey)
    .then(response => {
      var lista = response.data
      //dados -> o nome que passa para o pug
      // lista -> o que se obtem da response
      res.render('indice', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

module.exports = router;
