const express = require("express");
const router = express.Router();
const { getPrivateData, update, getAll, deleteUser } = require('../controllers/private');
const { protect } = require('../middleware/auth');


router.route('/update').put(protect, update);
router.route('/getAll').get(protect, getAll);
router.route('/deleteUser').delete(protect, deleteUser);

module.exports = router;3