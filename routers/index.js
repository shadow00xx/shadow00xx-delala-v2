const express = require('express');
const router = express.Router();
const indexContrller = require('../controllers/indexContrller')
const {admin, } = require('../middlewares/userType')
const { ensureAuth } = require('../middlewares/auth')

// landing page
router.get("/", indexContrller.landingPage);
router.post("/search", indexContrller.search);
router.get('/stores', indexContrller.store);
router.get('/latest', indexContrller.exploreLatest);
router.get('/serveces', indexContrller.serveces);
router.get('/about', indexContrller.about);
router.get('/term', indexContrller.terms);
router.get('/test', indexContrller.test);
router.post('/contact', ensureAuth,indexContrller.addcontact);
router.get('/categories', indexContrller.exploreCategories);
router.get('/categories/:id', indexContrller.exploreCategoriesById);
router.get('/myfav', ensureAuth, indexContrller.showMyFav)
module.exports = router