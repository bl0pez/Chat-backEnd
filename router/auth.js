const { Router } = require('express');
const { createUser, renewToken, loginUser } = require('../controllers/auth');

const router = Router();

//Crear un nuevo usuario
router.post('/new', createUser);

//Login de usuario
router.post('/login', loginUser);

//Revalidar token
router.get('/renew', renewToken);


module.exports = router;