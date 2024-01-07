var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.send({

    "success": true,
    "data": {
      resRedirectUrl : "/index"
    },
    "message": "İsteğiniz başarıyla işlendi."
    
  })

});



module.exports = router;
