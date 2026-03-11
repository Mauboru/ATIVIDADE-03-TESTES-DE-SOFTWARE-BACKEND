const { Router } = require('express');
const { criar } = require('../controllers/livroController');

const router = Router();

router.post("/", criar);

module.exports = router;