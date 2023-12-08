const {
    MongoClient, ObjectId
} = require('mongodb');
const qs = require("qs")
const responseHelper = require('./responseHelper');

module.exports = {


    dataExistsByField: async (field, value, databaseName, collectionName) => {

        return new Promise(async (resolve, reject) => {

            let documents = null;

            const uri = 'mongodb://0.0.0.0:27017';

            let client = new MongoClient(uri);

            try {

                await client.connect();

                const database = client.db(databaseName);

                const collection = database.collection(collectionName);

                let findObj = {}

                findObj[field] = value;

                documents = await collection.findOne(findObj);

                client.close();

            } catch (err) {

                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));

            }

            if (documents)
                resolve(true);
            else
                resolve(false);

        });

    },

    insertObject: async (object, databaseName, collectionName) => {

        return new Promise(async (resolve, reject) => {

            try {

                let documents = null;

                const uri = 'mongodb://0.0.0.0:27017';

                let client = new MongoClient(uri);

                await client.connect();

                const database = client.db(databaseName);

                const collection = database.collection(collectionName); 

                documents = await collection.insertOne(object);

                client.close();
                
                resolve(documents);

            } catch (err) {

                reject(err);

            }

        });
    },

    updateOneField: async (id, field, newValue, databaseName, collectionName) => {

        return new Promise(async (resolve, reject) => {

            let documents = null;

            try {

                const uri = 'mongodb://0.0.0.0:27017';

                let client = new MongoClient(uri);

                await client.connect();

                const database = client.db(databaseName);

                const collection = database.collection(collectionName);

                let setObj = {}

                setObj[field] = newValue;

                documents = await collection.updateOne({

                    '_id': new ObjectId(id)

                }, {

                    $set: setObj

                });

                client.close();

            } catch (err) {

                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));

            }

            resolve(documents);

        });

    },

    updateFields: async (id, newValues, databaseName, collectionName) => {
        return new Promise(async (resolve, reject) => {
            let documents = null;
            try {
                const uri = 'mongodb://0.0.0.0:27017';
                let client = new MongoClient(uri);
                await client.connect();
                const database = client.db(databaseName);
                const collection = database.collection(collectionName);
    
                let setObj = { ...newValues }; 
    
                documents = await collection.updateOne(
                    { '_id': new ObjectId(id) },
                    { $set: setObj }
                );
    
                client.close();
            } catch (err) {
                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));
            }
            resolve(documents);
        });
    },    

    deleteById: async (id, databaseName, collectionName) => {
        return new Promise(async (resolve, reject) => {
            let result = null;
            try {
                const uri = 'mongodb://0.0.0.0:27017';
                let client = new MongoClient(uri);
                await client.connect();
                const database = client.db(databaseName);
                const collection = database.collection(collectionName);
    
                result = await collection.deleteOne({ '_id': new ObjectId(id) });
    
                client.close();
            } catch (err) {
                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));
            }
            resolve(result);
        });
    },

    getDataByField: async (field, value, databaseName, collectionName) => {

        return new Promise(async (resolve, reject) => {

            let documents = null;

            const uri = 'mongodb://0.0.0.0:27017';

            let client = new MongoClient(uri);

            try {

                await client.connect();

                const database = client.db(databaseName);

                const collection = database.collection(collectionName);

                let findObj = {}

                findObj[field] = value;

                documents = await collection.findOne(findObj);

                client.close();

            } catch (err) {

                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));

            }

            if (documents)
                resolve(documents);
            else
                resolve(false);

        });

    },

    getByCollection: async (databaseName, collectionName) => {

        return new Promise(async (resolve, reject) => {

            let documents = null;

            const uri = 'mongodb://0.0.0.0:27017';

            let client = new MongoClient(uri);

            try {

                await client.connect();

                const database = client.db(databaseName);

                const collection = database.collection(collectionName);

                documents = await collection.find({}).toArray();

                client.close();

            } catch (err) {

                resolve(await responseHelper.resParser({
                    'error': 1,
                    'messages': err.message
                }));

            }

            if (documents)
                resolve(documents);
            else
                resolve(false);

        });

    },


}