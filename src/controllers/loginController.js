const bcrypt = require('bcryptjs');
const { selectByEmail } = require('../models/usersModel');
const { createToken } = require('../utils/helpers');



const login = async (req, res, next) => {
    const { email, password } = req.body;

    const usuario = await selectByEmail(email);
    if (!usuario) {
        return res.status(401).json({ message: 'Error en email y/o contraseña' });
    }

    const iguales = await bcrypt.compare(password, usuario.password);
    if (!iguales) {
        return res.status(401).json({ message: 'Error en email y/o contraseña' });
    }

    // Login correcto
    res.json({
        message: 'Login correcto',
        token: createToken(usuario)
    });
}

module.exports = { login };
