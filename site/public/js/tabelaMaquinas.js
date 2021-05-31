var maquina
let promisesLog = [];
let promiseDisco = [];
fetch(`/maquina/${sessionStorage.cnpj}`, {
    method: 'GET',
}).then(function (response) {
    return response.json();
}).then((maquinas) => {
    return maquinas;
}).then((res) => {
    maquina = res
    for (var i = 0; i < maquina.length; i++) {
        promisesLog.push(fetch(`/log/ultimo/${maquina[i].hostName}`, {
            method: 'GET',
        }))
    }
    for (var i = 0; i < maquina.length; i++) {
        for (let index = 1; index <= maquina[i].qtdParticoes; index++) {
            promiseDisco.push(fetch(`/maquina/ultimaMedicaoDisco/${maquina[i].hostName}/${index}`, {
                method: 'GET',
            }))
        }
    }
}).then(() => {
    Promise.all(promisesLog).then(function (response) {
        return Promise.all(response.map(function (resposta) {
            return resposta.json();
        }));
    }).then((log) => {
        Promise.all(promiseDisco).then(function (response) {
            return Promise.all(response.map(function (resposta) {
                return resposta.json();
            }));
        }).then(discos => {
            for (var i = 0; i < maquina.length; i++) {
                var totalArmazenamento = 0;
                var totalDisponivel = 0;
                for (let index = 0; index < discos.length; index++) {
                    if(discos[index].fkMaquina == maquina[i].hostName){
                        totalArmazenamento += discos[index].espacoTotal;
                        totalDisponivel += discos[index].espacoDisponivel;
                    }
                }
                var discoDisponivel = (((totalArmazenamento - totalDisponivel) * 100) / totalArmazenamento).toFixed(2)

                console.log(maquina[i].hostName);
                montaTabela(maquina[i], log[i], discoDisponivel)
            }
        })
    })
})




function montaTabela(info, dados, disco) {
    var Tr = montaTr(info, dados, disco);

    var tabela = document.querySelector('tbody');
    tabela.appendChild(Tr);
}

function montaTr(info, dados, disco) {
    var Tr = document.createElement('tr');

    Tr.appendChild(montaTd(info.hostName));
    Tr.appendChild(montaTd(dados.usoCpu.toString() + "%"));
    Tr.appendChild(montaTd(((dados.usoMemoria * 100) / info.qtdMemoria).toFixed(2) + "%"));
    Tr.appendChild(montaTd(disco + "%"));

    return Tr;
}

function montaTd(dado) {
    var td = document.createElement('td');
    td.textContent = dado;
    return td;
}