const database = require('../models')

class EnderecoController {
    static async criaEndereco(req, res) {
        const novoEndereco = req.body
        try {
            const novoEnderecoCriado = await database.Endereco.create(novoEndereco)
            return res.status(200).json(novoEnderecoCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    static async criaParametros(req, res) {
        const { fkCliente } = req.params
        const padrao = {
            ...req.body,
            fkCliente: fkCliente
        }
        try {
            const parametroPadrao = await database.Parametros.create(padrao)
            return res.status(200).json(parametroPadrao)
        } catch {
            return res.status(500).json(error.message)
        }
    }

    static async criaUsuario(req, res) {
        const { fkCliente } = req.params
        const novoUsuario = {
            ...req.body,
            fkCliente: fkCliente
        }
        try {
            const novoUsuarioCriado = await database.Usuario.create(novoUsuario)
            return res.status(200).json(novoUsuarioCriado)
        } catch {
            return res.status(500).json(error.message)
        }
    }

    static async criaCliente(req, res) {
        const {
            fkCep
        } = req.params
        const novoCliente = {
            ...req.body,
            fkCep: fkCep
        }
        try {
            const novoClienteCriado = await database.Cliente.create(novoCliente)
            return res.status(200).json(novoClienteCriado)
        } catch {
            return res.status(500).json(error.message)
        }
    }

    static async selectEndereco(req,res){
        const { cep } = req.params;
        try{
            const todosEnderecos = await database.Endereco.findOne({
                where: {cep: cep}
            })
            return res.status(200).json(todosEnderecos)
        }catch (erro){
            return res.status(500).json(erro.message)
        }
    }

    static async selectParametros(req, res) {
        const { fkCliente } = req.params;
        try{
            const param = await database.Parametros.findOne({
                where: {
                    fkCliente: fkCliente
                }
            });
            return res.status(200).json(param)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async alteraParametros(req, res){
        const { fkCliente } = req.params;
        const novasInfo = req.body;
        try{
            await database.Parametros.update(novasInfo,{where: {fkCliente: fkCliente}})
            const c = await database.Parametros.findOne({
                where: {
                    fkCliente: fkCliente
                }
            })
            return res.status(200).json(c)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async alteraUsuario(req, res){
        const { email } = req.params;
        const novasInfo = req.body;
        try{
            await database.Usuario.update(novasInfo,{where: { email: email}})
            const a = await database.Usuario.findOne({
                where: {
                    email: email
                }
            })
            return res.status(200).json(a)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async alteraCliente(req, res){
        const { cnpj } = req.params;
        const novasInfo = req.body;
        try{
            await database.Cliente.update(novasInfo,{where: {cnpj: cnpj}})
            const b = await database.Cliente.findOne({
                where: {cnpj: cnpj}
            })
            return res.status(200).json(b)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async selectCliente(req, res) {
        const { cnpj } = req.params;
        try{
            const todosClientes = await database.Cliente.findOne({
                where: {cnpj: cnpj}
            });
            return res.status(200).json(todosClientes)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async selectUsuario(req, res) {
        const {
            email,
            senha
        } = req.params
        try {
            const usuario = await database.Usuario.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            })
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async selectUsuarioPorEmail(req, res) {
        const {
            email
        } = req.params
        try {
            const usuarioPorEmail = await database.Usuario.findOne({
                where: {
                    email: email
                }
            })
            return res.status(200).json(usuarioPorEmail)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = EnderecoController