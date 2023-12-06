const fs = require('fs')

module.exports = {

    resParser: async (response) => {
        
        if(response.error != '1'){

            return {
                "status" : 200,
                "code": 'success',
                "message": response.messages,
                "data" : response.data
            }

        } else {

            return {
                "status" : 200,
                "code": "error",
                "message": response.messages,
                "data" : ""
            }

        }
    },

}


    
