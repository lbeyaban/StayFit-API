var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; 
  const secretKey = process.env.SECRET_KEY; 

  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı, yetkilendirme reddedildi.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Geçersiz token, yetkilendirme reddedildi.' });
    }

    req.user = decoded;
    next(); 

  });

};

function checkAuthenticated(req, res, next) {

  if (req.user) {
    return next()
  }

  res.redirect('/user/login')

}

function checkNotAuthenticated(req, res, next) {

  if (req.user) {

    return res.status(400).json({
  
      error : false,
      message : "Active Session"

    })

  }

  next()

}

//Tüm Kullanıcıların listesini getirir
router.get('/', verifyToken ,async function(req, res, next) {

  await userController.getUsers(req,res,next);

});

//ID'ye göre kullanıcı getirir
router.get('/:id',verifyToken, async function(req, res, next) {

  await userController.getUserById(req,res,next);

});

//ID'ye göre kullanıcıyı gunceller
router.put('/:id',verifyToken, async function(req, res, next) {

  await userController.updateUser(req,res,next);

});

//ID'ye göre kullanıcıyı Siler
router.delete('/:id', verifyToken, async function(req, res, next) {

  await userController.deleteById(req,res,next);

});

//Yeni Kullanıcı Ekler
router.post('/', verifyToken , async function(req, res, next) {

  await userController.addUser(req,res,next);

});

router.post('/login', checkNotAuthenticated,  async function(req, res, next) {

  await userController.login(req,res,next);

});

router.post('/register', checkNotAuthenticated, async function(req, res, next) {

  await userController.addUser(req,res,next)

});


module.exports = router;
