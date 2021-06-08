(() => {
    const form = document.getElementById('formEmpresa');
    var ul = document.querySelector('#erroFormEmpresa');
    var erro = []

    function cadastro() {

        var novoUsuario = {
            telComercial: telComercial.value,
            cel: cel.value,
        }
        return novoUsuario;
    }

    function validaUsuario(usuario) {
        erro = [];

        if (usuario.cel == '') {
            erro.push('O telefone celular não pode estar em branco.');
        }

        if (usuario.telComercial == '') {
            erro.push('O telefone comercial não pode estar em branco.');
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


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var usuario = cadastro();
        var erros = validaUsuario(usuario);
        if (erros.length > 0) {
            exibeErro(erros);
            return;
        } else {
            ul.classList.add('invisivel');

            var telCom = telComercial.value.replaceAll('(', '');
            telCom = telCom.replaceAll(')', '');
            telCom = telCom.replaceAll('-', '');
            telCom = telCom.replaceAll(' ', '');

            var celular = cel.value.replaceAll('(', '');
            celular = celular.replaceAll(')', '');
            celular = celular.replaceAll('-', '');
            celular = celular.replaceAll(' ', '');
            var form = {
                telefoneComercial: telCom,
                telefoneCelular: celular,
            }

            fetch(`/alteraCliente/${sessionStorage.cnpj}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).then(function(response) {
                if (!response.ok) {
                    var erro = [response];
                    exibeErro(erro, 1);
                } else {
                    alert("contato Alterado com sucessoss")
                }
            });

        }
    });

})()