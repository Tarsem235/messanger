const express = require('express');
const { sendMessage , getMessage } = require('../controller/message.controller.js');
const  secureRoute = require('../middleware/secureRoute.js');
const router = express.Router();
router.post('/send/:id',secureRoute , sendMessage);
router.get('/get/:id',secureRoute , getMessage);
module.exports = router;
