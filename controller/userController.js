let userController = {}
const { ObjectId } = require('mongodb');
const mongoHelper = require('../helper/mongoHelper')
const jwt = require('jsonwebtoken');

userController.getUsers = async function (req, res, next) {

    try {

        let rs = await mongoHelper.getByCollection("StayFit", "Users");

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

userController.addUser = async function(req,res,next){

    try {

        newUser = req.body.data

        if (typeof req.body.data == 'string') {
            newUser = JSON.parse(req.body.data)
        }

        let rs = await mongoHelper.insertObject(newUser, "StayFit", "Users")

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

userController.login = async function(req,res,next){

    try {
        const secretKey = 'supersecretkey';
        const { email, password } = req.body || {};

        console.log("Email" , email);
        console.log("Password" , password);
        
        var user = await mongoHelper.getDataByField("email" , email, "StayFit", "Users")

        console.log("User : " , user);

        if(!user){

            res.status(404).json({ message: 'Kullanıcı Bulunamadı.' });

        }else {

            if(user.password == password){

                const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
                res.send({
                    "success": true,
                    "token": token
                })

            }else {

                res.status(401).json({ message: 'Hatalı şifre' });

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