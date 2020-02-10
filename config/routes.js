const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('./cloudinary.config');
const userController = require("../controllers/user.controller")
const likesController = require("../controllers/likes.controller")
const matchesController = require("../controllers/matches.controller")


router.post("/register", upload.single('avatar'), userController.new)
router.post("/login", authMiddleware.isNotAuthenticated, userController.doLogin)
router.post("/logout", authMiddleware.isAuthenticated, userController.logout)
router.patch("/edit/:id", authMiddleware.isAuthenticated, userController.doEdit)
router.get("/profile/:id", authMiddleware.isAuthenticated, userController.profile)



module.exports = router;
