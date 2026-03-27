const jwt = require('jsonwebtoken');

//req : request Json{} URL ?param1=valor1
//res : response Json{} status:200,400,500 respuesta del aplicativo
//next : función que se llama para pasar al siguiente middleware o controlador

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
            res.status(401).json({ message: 'Invalid token.' });
        }
    };