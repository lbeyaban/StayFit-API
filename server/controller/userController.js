let userController = {}
const {
    ObjectId
} = require('mongodb');
const mongoHelper = require('../helper/mongoHelper')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/user')


userController.getUsers = async function (req, res, next) {

    try {

        let rs = await mongoHelper.getByCollection("StayFit", "users");

        let data = {

            "success": true,
            "data": rs,
            "message": "İsteğiniz başarıyla işlendi."

        }

        res.send(data)

    } catch (error) {

        let err = {
            "success": false,
            "error": {
                "message": error.message,
            }
        }

        res.send(err)

    }

}

userController.getUserById = async function (req, res, next) {

    try {

        let rs = await mongoHelper.getDataByField("_id", new ObjectId(req.params.id), "StayFit", "Users")

        let data = {

            "success": true,
            "data": rs,
            "message": "İsteğiniz başarıyla işlendi."

        }

        res.send(data)

    } catch (error) {

        let err = {
            "success": false,
            "error": {
                "message": error.message,
            }
        }

        res.send(err)

    }

}

userController.updateUser = async function (req, res, next) {

    try {

        newData = req.body.data;

        if (typeof req.body.data == 'string') {
            newData = JSON.parse(req.body.data)
        }

        let rs = await mongoHelper.updateFields(req.params.id, newData, "StayFit", "Users")

        let data = {

            "success": true,
            "data": rs,
            "message": "İsteğiniz başarıyla işlendi."

        }

        res.send(data)

    } catch (error) {

        let err = {
            "success": false,
            "error": {
                "message": error.message,
            }
        }

        res.send(err)

    }


}

userController.deleteById = async function (req, res, next) {

    try {

        let rs = await mongoHelper.deleteById(req.params.id, "StayFit", "Users")

        let data = {

            "success": true,
            "data": rs,
            "message": "İsteğiniz başarıyla işlendi."

        }

        res.send(data)

    } catch (error) {

        let err = {
            "success": false,
            "error": {
                "message": error.message,
            }
        }

        res.send(err)

    }


}

userController.addUser = async function (req, res, next) {

    try {

        if(!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.birthday || !req.body.gender || !req.body.weight || !req.body.lenght || !req.body.goals){
    
          return res.status(400).json({
      
            error : true,
            message : "Boş alan veya alanlar olmamalı"
      
          })
      
        }else {
      
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
          const newUser = new User({
      
            name: req.body.name,
            surname : req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            birthday : req.body.birthday,
            gender : req.body.gender,
            weight : req.body.weight,
            lenght: req.body.lenght,
            goals : req.body.goals
      
          });
    
          const user = await newUser.save();
    
          res.status(201).json({
    
            error : false,
            message : "Kullanıcı başarıyla kaydedildi."
    
          })
    
        }
        
      } catch (err) {
        
        return res.status(400).json({
    
          error : true,
          message : 'Kullanıcı kaydedilemedi : ' + err.message
    
        })
    
      }

}

userController.login = async function (req, res, next) {

    try {
        const secretKey = process.env.SECRET_KEY;
        console.log("Secret key : ",secretKey);
        const {
            email,
            password
        } = req.body || {};

        console.log("Email", email);
        console.log("Password", password);

        var user = await mongoHelper.getDataByField("email", email, "StayFit", "users")

        console.log("User : ", user);

        if (!user) {

            res.status(404).json({
                message: 'Kullanıcı Bulunamadı.'
            });

        } else {

            if (bcrypt.compare(password, user.password)) {

                const token = jwt.sign(user, secretKey, {
                    expiresIn: '1h'
                });
                res.send({
                    "success": true,
                    "token": token
                })

            } else {

                res.status(401).json({
                    message: 'Hatalı şifre'
                });

            }

        }

    } catch (error) {

        let err = {
            "success": false,
            "error": {
                "message": error.message,
            }
        }

        res.send(err)

    }


}


module.exports = userController