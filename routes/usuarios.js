
const { Router } = require('express');
const { body, check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { esAppValida, emailExiste, existeUsuarioId } = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    body('app').custom( esAppValida ),
    validarCampos
], usuariosPut );

router.post('/',[
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('password','El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    body('correo','Este no es correo').isEmail(),
    body('app').custom( esAppValida ),
    body('correo').custom( emailExiste ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;