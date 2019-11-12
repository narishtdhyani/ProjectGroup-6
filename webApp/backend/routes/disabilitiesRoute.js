var express = require('express');
var router = express.Router();
var disabilitiesController = require('../controller/DisabilitiesController') ;
let middleware = require('../middleware/verifyToken');



router.post('/disability',middleware.verifyToken, disabilitiesController.add);

router.put('/disability/:id',middleware.verifyToken, disabilitiesController.edit);

router.get('/disability/:id',middleware.verifyToken,disabilitiesController.getMyDisability);

router.get('/myDisabilities',middleware.verifyToken,disabilitiesController.getMyAllDisabilities);


module.exports = router;
