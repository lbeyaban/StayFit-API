var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')


//Tüm Kullanıcıların listesini getirir
router.get('/', async function(req, res, next) {

  await userController.getUsers(req,res,next);

});

//ID'ye göre kullanıcı getirir
router.get('/:id', async function(req, res, next) {

  await userController.getUserById(req,res,next);

});

//ID'ye göre kullanıcıyı gunceller
router.put('/:id', async function(req, res, next) {

  await userController.updateUser(req,res,next);

});

//ID'ye göre kullanıcıyı Siler
router.delete('/:id', async function(req, res, next) {

  await userController.deleteById(req,res,next);

});

//Yeni Kullanıcı Ekler
router.post('/', async function(req, res, next) {

  await userController.addUser(req,res,next);

});


module.exports = router;
