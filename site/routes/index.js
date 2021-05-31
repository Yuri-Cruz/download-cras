const bodyParser = require('body-parser')
const endereco = require('./enderecoRoutes')
const maquina = require('./maquinaRoutes')

module.exports = app => {
    app.use(bodyParser.json())
    
    app.use(endereco)
    app.use(maquina)
    app.get('/index.html')
}