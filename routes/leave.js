const express = require('express');

const leaveController = require('../controllers/leave.js');
const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/apply', userAuth.authenticate, leaveController.postleave);

router.get('/emp-get', userAuth.authenticate, leaveController.getEmp);

module.exports = router;