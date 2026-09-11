
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/auth')
const upload = require('../middlewares/up');
const userContrller = require('../controllers/userContrller');

router.get("/login", ensureGuest, userContrller.login)
router.get("/signup", ensureGuest, userContrller.signup)
router.post("/signup", userContrller.signupPost)
router.post('/login', userContrller.loginPost);
router.get("/profile",ensureAuth, userContrller.profile)
router.put('/edit', ensureAuth,upload.single('image'), userContrller.editProfile)
router.put('/:user.id', ensureAuth, userContrller.editPro)
router.get("/:id/profile",ensureAuth, userContrller.showUsersMyProfile)
router.get("/logout", userContrller.logout);
module.exports = router