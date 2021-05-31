const form = document.getElementById('form');
var ul = document.querySelector('#menssagemErro');
var erro = [];
var botao = true;

function cadastro() {
    var novoUsuario = {
        email: email.value,
        senha: senha.value,
    }
    return novoUsuario;
}

function validaUsuario(usuario) {
    erro = [];

    if (usuario.email == '') {
        erro.push('O email não pode estar em branco.');
    } 

    if (usuario.senha == '') {
        erro.push('A senha não pode estar em branco.');
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
        if(botao){
            botao = false
            ul.classList.add('invisivel');
            login();
        }
    }
});

function login() {
    fetch(`/usuario/${email.value}/${senha.value}`, {
        method: 'GET',
    }).then(function (response) {
        return response.json();
    }).then(user => {
        if(user != null){
            sessionStorage.email = user.email;
            sessionStorage.cnpj = user.fkCliente;
            window.location.href = 'dashGeral.html'
        } else {
            erro.push('email ou senha invalido')
            exibeErro(erro);
            login = true
        }
    });
}