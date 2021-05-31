(() => {
    const form = document.getElementById('formParametros');
    var ul = document.querySelector('#erroFormParametros');
    var erro = []

    function cadastro() {
        var novoUsuario = {
            cpu: cpu.value,
            ram: ram.value,
            disco: disco.value,
        }
        return novoUsuario;
    }

    function validaUsuario(usuario) {
        erro = [];

        if (usuario.cpu == '') {
            erro.push('O parametro de cpu não pode estar em branco.');
        }

        if (usuario.ram == '') {
            erro.push('O parametro de ram não pode estar em branco.');
        }

        if (usuario.disco == '') {
            erro.push('O parametro de discos não pode estar em branco.');
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
            var form = {
                cpu: cpu.value,
                ram: ram.value,
                disco: disco.value,
            }

            fetch(`/alteraParametro/${sessionStorage.cnpj}`, {
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
                    alert("parametros Alterados com sucessoss")
                }
            });

        }
    });

})()