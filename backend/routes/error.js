const router = require('express').Router();
const { error } = require('../controllers/error');

router.all('/*', error);

module.exports = router;
