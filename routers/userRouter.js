const {addUser, getSingleUser, getAllUser} = require('../controllers/userController');
const router = require('express').Router();

router.post('/users/signup', addUser);
router.get('/users/singleuser/:email', getSingleUser);
router.get('/users/allusers', getAllUser);


module.exports = router;