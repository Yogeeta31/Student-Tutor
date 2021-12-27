const { Router } = require('express');
const searchController = require('../controllers/searchController');
const router = Router();

router.get('/tutors', searchController.search_tutor_get);

module.exports = router;

