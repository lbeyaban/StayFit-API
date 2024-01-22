let mealController = {}

const {
    description
} = require('@adonisjs/cli/src/Commands/New')
const mongoHelper = require('../helper/mongoHelper')

mealController.getMeals = async function (req, res, next) {

    try {

        let rs = await mongoHelper.getByCollection('StayFit', 'Meals')

        if (rs != null) {

            res.status(200).json({
                error: 0,
                data: rs
            })

        } else {
            res.status(404).json({
                error: 0,
                meesage: 'We couldnt get data.'
            })
        }

    } catch (error) {

        res.status(404).json({
            error: 1,
            message: error.message
        })

    }

}

mealController.getMealByQuery = async function (req, res, next) {

    try {

        const query = req.query.search || null

        if (query) {

            let rs = await mongoHelper.searchDataByWord('name', query, 'StayFit', 'Meals')

            if (rs) {

                res.status(200).json({
                    error: 0,
                    data: rs

                })

            }

        } else {

            res.status(200).json({
                error: 0,
                message: 'Enter the word to search for'

            })

        }


    } catch (error) {

        res.status(404).json({
            error: 1,
            message: error.message
        })

    }


}

mealController.addMeal = async function (req, res, next) {

    try {

        const {
            name,
            description,
            calori
        } = req.body || {};

        if (name == null || calori == null) {

            res.status(404).json({
                message: 'Variables dont be null'
            });

        } else {

            let meal = {
                name: name,
                description: description,
                calori: calori
            }

            let rs = await mongoHelper.insertObject(meal, 'StayFit', 'Meals')

            if (rs.insertedId) {

                res.status(201).json({
                    error: 0,
                    message: 'Meal Added',
                    id: rs.insertedId
                })

            } else {

                res.status(404).json({
                    error: 1,
                    data: rs
                })

            }

        }

    } catch (error) {

        res.status(404).json({
            error: 1,
            message: error.message
        })

    }


}

mealController.addMealPlan = async function(req,res,next){

    try {

        

    } catch (error) {

        res.status(404).json({
            error: 1,
            message: error.message
        })

    }


}



module.exports = mealController;