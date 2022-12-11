const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

//Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
],createUser);

//Login de usuario
router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
],loginUser);

//Revalidar token
router.get('/renew', renewToken);


module.exports = router;