const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    try {
       
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRET_TOKEN);

        req.uid = uid;

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}