const fs = require('fs')

module.exports = {

    resParser: async (response) => {
        
        if(response.error != '1'){

            return {
                "status" : 200,
                "code": 'success',
                "data" : response.data,
                "message": response.messages
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


    
