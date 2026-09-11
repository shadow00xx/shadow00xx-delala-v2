
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middlewares/auth')
const upload = require('../middlewares/up');
const checkObjectId = require('../middlewares/checkObjectId');
const prodectsContrller = require('../controllers/prodectsContrller');

router.get('/add-prodect', ensureAuth, prodectsContrller.addprodect)
router.post('/add-prodect', ensureAuth, upload.any('image', 3), prodectsContrller.addproPost)
router.get('/myProdects', ensureAuth, prodectsContrller.showMyPro)
router.get('/:id', prodectsContrller.showOnePro)
router.put('/:id/favorite', ensureAuth, prodectsContrller.Favorite)
router.put('/:id/unfavorite', ensureAuth, prodectsContrller.unFavorite)
router.put('/:id/report', ensureAuth, prodectsContrller.addreport)
router.delete('/:id', ensureAuth, prodectsContrller.deletePro)
module.exports = router
