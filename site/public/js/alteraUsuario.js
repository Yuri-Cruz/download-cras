(() => {
    const form = document.getElementById('formUsuario');
    var ul = document.querySelector('#erroFormUsuario');
    var erro = []
    
    function cadastro() {
        var novoUsuario = {
            nome: nome.value,
            senhaAtual: senhaAtual.value,
            novaSenha: novaSenha.value,
            confirmacaoNovaSenha: confirmacaoNovaSenha.value
        }
        return novoUsuario;
    }
    
    function validaUsuario(usuario) {
        erro = [];
    
        if (usuario.nome == '') {
            erro.push('O nome não pode estar em branco.');
        }
    
        if (usuario.senhaAtual == '') {
            erro.push('A senha atual não pode estar em branco.');
        } else if (senhaAtual.value != usuarioJs.senha) {
            erro.push('A senha atual esta incorreta.');
        }
    
        if (usuario.confirmacaoNovaSenha != '' || usuario.novaSenha != '') {
            if (usuario.confirmacaoNovaSenha == '') {
                erro.push('A confirmação da nova senha não pode estar em branco.');
            }
    
            if (usuario.novaSenha == '') {
                erro.push('A nova senha não pode estar em branco.');
            } else if (usuario.novaSenha != usuario.confirmacaoNovaSenha) {
                erro.push('A confirmação de senha não confere.');
            } else if (!(usuario.novaSenha.length >= 8)) {
                erro.push('A senha deve ter no minimo 8 digitos.');
            }
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
    
            if (usuario.novaSenha != '') {
                var form = {
                    nome: nome.value,
                    senha: novaSenha.value
                }
            } else {
                var form = {
                    nome: nome.value
                }
            }
    
    
    
    
            fetch(`/alteraUsuario/${email.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).then(function (response) {
                if (!response.ok) {
                    var erro = [response];
                    exibeErro(erro, 1);
                } else {
                    alert("usuario Alterado com sucessoss")
                    senhaAtual.value = "";
                    novaSenha.value = "";
                    confirmacaoNovaSenha.value = "";
                }
            });
    
        }
    });
})()
