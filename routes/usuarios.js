
const { Router } = require('express');
const { body, check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        validarRol
    } = require('../middlewares');

const { 
        esApplicationValida, 
        emailExiste, 
        existeUsuarioId } = require('../helpers/db-validators');

const { 
        usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const speechs = require('../helpers/speechs');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    validarJWT,
    check('id', speechs.INVALID_ID).isMongoId(),
    check('id').custom( existeUsuarioId ),
    body('app').custom( esApplicationValida ),
    validarCampos
], usuariosPut );

router.post('/',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('password','El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    body('correo','Este no es correo').isEmail(),
    //body('app').custom( esApplicationValida ),
    body('correo').custom( emailExiste ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;