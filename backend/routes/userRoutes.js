const express= require('express');
const { logiUser,signupUser,getUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();



router.post("/login", logiUser);
router.post("/signup", signupUser);

router.get("/protected", requireAuth, getUser);
module.exports = router;