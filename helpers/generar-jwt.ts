import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || 'KEYNOTEXIST', {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })    
    })

}

export default generarJWT;