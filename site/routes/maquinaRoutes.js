const { Router } = require('express')
const MaquinaController = require('../controllers/MaquinaController')

const router = Router()
router.get('/maquina/:fkCliente', MaquinaController.selectMaquinasPorFk)
router.get('/log/ultimo/:hostName', MaquinaController.selectLogMaisRecente)
router.get('/log/todos/:hostName',MaquinaController.selectLogs)
router.get('/maquina/especifica/:hostName', MaquinaController.selectMaquinasPorHostName)
router.get('/maquina/ultimaMedicaoDisco/:hostName/:id', MaquinaController.selectMedicaoDiscoMaisRecente)
module.exports = router