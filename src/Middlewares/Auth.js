const jwt = require ("jsonwebtoken");

//middleware comunicasion entre usuario y servidor lo ocupamos en las rutas pq lo va usar el thunderclient
//req= request json {} URL ? param1=valor1
//res = response respuesta de nuestro aplicativo
//next pasa a la siguiente capa de funcionalidad 
module.exports= (req ,res ,next) =>{
  const authHeader = req.header("Authorization"); // toma header completo
    const token = authHeader && authHeader.split(" ")[1]; // separa Bearer
 
    if(!token){
        return res.status(401).json ({msg:"No token, permission denied"});

    }//comprobando si el token existe
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado.usuario;//aceder a la info del usuario
        next();
        
    } catch (error) {
        res.status(401).json({msg:"Invalid token"})
        
    } 
}