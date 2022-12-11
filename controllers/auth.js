const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        
        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User({ name, email, password });

        //Enciptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        //Guardar en DB
        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id)

        res.json({
            msg: 'Crear usuario',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

};

const loginUser = async (req, res) => {

    const { email , password } = req.body;

    try {
        
        const userDB = await User.findOne({email});

        //Verificar email
        if (!userDB) {
            return res.status(404).json({
                msg: 'Email no encontrado'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar JWT
        const token = await generateJWT(userDB.id);

        res.json({
            msg: 'Login',
            user: userDB,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const renewToken = async (req, res) => {

}

module.exports = {
    createUser,
    renewToken,
    loginUser
}