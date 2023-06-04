const express = require('express');

const router = express.Router();

const controllerWeb = require('../controller/web')
const controllerApi = require('../controller/api')

router.get('/', controllerWeb.default);
router.get('/api', controllerApi.default);
router.get('/api/data', controllerApi.data);

module.exports = router;