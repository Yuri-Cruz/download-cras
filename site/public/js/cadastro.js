const ul = document.querySelectorAll('[data-erros]')
var botao = true;

function criaEstrutura() {
    var novoUsuario = {
        nome: nome.value,
        empresa: empresa.value,
        email: email.value,
        cnpj: cnpj.value,
        senha: senha.value,
        confirmacaoSenha: confirmacaoSenha.value,
        celular: celular.value,
        cep: cep.value,
        numero: numero.value
    }
    return novoUsuario;
}

function validaUsuario(usuario) {
    var erro = [];

    if (usuario.nome == '') {
        erro.push('O nome não pode estar em branco.');
    }

    if (usuario.empresa == '') {
        erro.push('O nome da empresa não pode estar em branco.');
    }

    if (usuario.cnpj == '') {
        erro.push('O CNPJ não pode estar em branco.');
    } else if (usuario.cnpj.length < 14) {
        erro.push('O CNPJ deve conter 14 caracteres.')
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

function validaContato(usuario) {
    var erro = [];
    if (usuario.celular == '') {
        erro.push('O número do celular não pode estar em branco.');
    }

    if (usuario.cep == '') {
        erro.push('O CEP não pode estar em branco.');
    } else if (usuario.cep.length < 8) {
        erro.push('O CEP deve conter 14 caracteres.');
    }

    if (usuario.numero == '') {
        erro.push('O número não pode estar em branco.');
    }
    return erro;
}

function exibeErro(erros, i) {
    ul[i].innerHTML = "";
    erros.forEach(erro => {
        var li = document.createElement('li');
        li.textContent = erro;
        ul[i].appendChild(li)
    });
    ul[i].classList.remove('invisivel');
}

// troca de formulario
const formulario1 = document.getElementById('form1')
formulario1.addEventListener('submit', function(e) {
    e.preventDefault();
    var usuario = criaEstrutura();
    var erros = validaUsuario(usuario);
    if (erros.length > 0) {
        exibeErro(erros, 0);
        return;
    } else {
        loginContent.style.display = "none";
        form2.style.display = "flex";
        document.getElementById("espelho").classList.add("espelho")
    }
});

const formulario2 = document.querySelector('[data-btn-enviar]');;
formulario2.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("click");
    var usuario = criaEstrutura();
    var erros = validaContato(usuario);
    if (erros.length > 0) {
        exibeErro(erros, 1);
        return;
    } else {
        if (botao) {
            botao = false;
            cadastraEndereco();
            cadastraCliente();
        }
    }
});

const btnvoltar = document.querySelector('[data-btn-volta]');
btnvoltar.addEventListener("click", (e) => {
    e.preventDefault();
    loginContent.style.display = "flex";
    form2.style.display = "none";
    document.getElementById("espelho").classList.remove("espelho")
})




//api de envio pro banco de dados

function cadastraEndereco() {
    var form = {
        cep: cep.value.replace("-", ""),
        logradouro: logradouro.value,
        bairro: bairro.value,
        estado: uf.value,
        cidade: localidade.value
    }
    fetch("/endereco", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(function(response) {
        if (!response.ok) {
            console.log(response);
        }
    });
}

function cadastraCliente() {
    var cnpj1 = cnpj.value.replaceAll('.', '');
    cnpj1 = cnpj1.replaceAll('-', '');
    cnpj1 = cnpj1.replaceAll('/', '');

    var telCom = comercial.value.replaceAll('(', '');
    telCom = telCom.replaceAll(')', '');
    telCom = telCom.replaceAll('-', '');
    telCom = telCom.replaceAll(' ', '');

    var cel = celular.value.replaceAll('(', '');
    cel = cel.replaceAll(')', '');
    cel = cel.replaceAll('-', '');
    cel = cel.replaceAll(' ', '');

    var form = {
        nomeEmpresa: empresa.value,
        cnpj: cnpj1,
        numero: numero.value,
        complemento: complementeo.value,
        telefoneCelular: cel,
        telefoneComercial: telCom
    }
    fetch(`/endereco/${cep.value.replace("-","")}/cliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(function(response) {
        if (!response.ok) {
            var erro = [response];
            exibeErro(erro, 1);
        }
        cadastraUsuario()
    });
}

function defineParametros() {
    var cnpj1 = cnpj.value.replaceAll('.', '');
    cnpj1 = cnpj1.replaceAll('-', '');
    cnpj1 = cnpj1.replaceAll('/', '');
    var form = {
        cpu: 80,
        ram: 80,
        discos: 80
    }
    fetch(`/endereco/${cnpj1}/parametro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(function(response) {
        if (response.ok) {
            window.location.href = 'Login.html'
        }
    });
}

function cadastraUsuario() {
    var cnpj1 = cnpj.value.replaceAll('.', '');
    cnpj1 = cnpj1.replaceAll('-', '');
    cnpj1 = cnpj1.replaceAll('/', '');
    var form = {
        email: email.value,
        nome: nome.value,
        senha: senha.value
    }
    fetch(`/endereco/${cnpj1}/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(function(response) {
        if (response.ok) {
            defineParametros()
        } else {
            var erro = [response];
            exibeErro(erro, 1);
        }
    });
}