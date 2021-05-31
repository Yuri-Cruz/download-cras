const { Router } = require('express')
const EnderecoController = require('../controllers/EnderecoController')

const router = Router()

router.post('/endereco', EnderecoController.criaEndereco)
router.post('/endereco/:fkCliente/usuario', EnderecoController.criaUsuario)
router.post('/endereco/:fkCep/cliente', EnderecoController.criaCliente)
router.post('/endereco/:fkCliente/parametro', EnderecoController.criaParametros)
router.get('/cliente/:cnpj', EnderecoController.selectCliente)
router.get('/usuario/:email/:senha', EnderecoController.selectUsuario)
router.get('/endereco/:cep', EnderecoController.selectEndereco)
router.get('/usuario/:email', EnderecoController.selectUsuarioPorEmail)
router.get('/parametro/:fkCliente', EnderecoController.selectParametros)
router.put('/alteraUsuario/:email', EnderecoController.alteraUsuario)
router.put('/alteraCliente/:cnpj', EnderecoController.alteraCliente)
router.put('/alteraParametro/:fkCliente', EnderecoController.alteraParametros)

module.exports = router