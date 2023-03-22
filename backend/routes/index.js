const router = require('express').Router();

router.use('/crash-test', require('./crashTest'));
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));
router.use('/', require('./error'));

module.exports = router;
