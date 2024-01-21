var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mealController = require('../controller/mealController');

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

//Tüm Yemek listesini getirir
router.get('/', verifyToken ,async function(req, res, next) {

  await mealController.getMeals(req,res,next)

});

router.post('/add-meal', verifyToken ,async function(req, res, next) {

  await mealController.addMeal(req,res,next)

});

router.get('/query',verifyToken, async function(req, res, next) {

  await mealController.getMealByQuery(req,res,next)

});



module.exports = router;
