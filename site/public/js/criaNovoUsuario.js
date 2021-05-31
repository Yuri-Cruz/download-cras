(() => {
    const form = document.getElementById('formNovoUsuario');
    var ul = document.querySelector('#erroFormNovoUsuario');
    var erro = []
    
    function cadastro() {
        var novoUsuario = {
            nome: nomeNovoUser.value,
            email: emailNovoUser.value,
            senha: senhaNovoUser.value,
            confirmacaoSenha: confirmacaoSenhaNovoUser.value
        }
        return novoUsuario;
    }
    
    function validaUsuario(usuario) {
        erro = [];
    
        if (usuario.nome == '') {
            erro.push('O nome não pode estar em branco.');
        }
    
        if (usuario.email == '') {
            erro.push('O email não pode estar em branco.');
        } else if (usuario.email.indexOf('@') < 0) {
            erro.push('o email deve conter um @.');
        }
    
        if (usuario.senha == '' || usuario.confirmacaoSenha == '') {
            if (usuario.senha == '') {
                erro.push('A senha não pode estar em branco.');
            }
            if (usuario.confirmacaoSenha == '') {
                erro.push('A confirmação de senha não pode estar em branco.');
            }
        } else if (usuario.senha != usuario.confirmacaoSenha) {
            erro.push('A confirmação de senha não confere.');
        } else if (!(usuario.senha.length >= 8)) {
            erro.push('A senha deve ter no minimo 8 digitos.');
        }
    
        return erro;
    }
    
    function exibeErro(erros) {
        ul.innerHTML = "";
        erros.forEach(erro => {
            var li = document.createElement('li');
            li.textContent = erro;
            ul.appendChild(li)
        });
        ul.classList.remove('invisivel');
    }
    
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var usuario = cadastro();
        var erros = validaUsuario(usuario);
        if (erros.length > 0) {
            exibeErro(erros);
            return;
        } else {
            ul.classList.add('invisivel');
    
            cadastraUsuario()

        }
    });
    
    function cadastraUsuario() {
        var form = {
            email: emailNovoUser.value,
            nome: nomeNovoUser.value,
            senha: senhaNovoUser.value
        }
        fetch(`/endereco/${sessionStorage.cnpj}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        }).then(function (response) {
            if (response.ok) {
                alert("novo usuario criado")
                emailNovoUser.value = "";
                nomeNovoUser.value = "";
                senhaNovoUser.value = "";
            } else {
                var erro = [response];
                exibeErro(erro,1);
            }
        });
    }
})()