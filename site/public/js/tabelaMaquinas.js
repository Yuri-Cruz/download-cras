var maquina
let promisesLog = [];
let promiseDisco = [];
let geolocalizacao = [];
var geo;

var Mooca = ["Mooca","Vila Bertioga"]
var SaoMiguel = ["Jardim Robru"]
var Guaianases = ["Vila Marilena"]
var Jacane = ["Jardim Ataliba Leonel"]
var teste;
var id;
var map;
var data = [
    ['AF', 0],
    ['BT', 0],
    ['CL', 0],
    ['CS', 0],
    ['CV', 0],
    ['AD', 0],
    ['CT', 0],
    ['EM', 0],
    ['FO', 0],
    ['GN', 0],
    ['IP', 0],
    ['IT', 0],
    ['IQ', 0],
    ['JA', 0],
    ['JT', 0],
    ['LA', 0],
    ['MB', 0],
    ['MO', 0],
    ['PA', 0],
    ['PE', 0],
    ['PR', 0],
    ['PI', 0],
    ['PJ', 0],
    ['ST', 0],
    ['SA', 0],
    ['SP', 0],
    ['SM', 0],
    ['MP', 0],
    ['SE', 0],
    ['MG', 0],
    ['VM', 0],
    ['VP', 0]
];
fetch('./json/geojs-35-mun.json').then((res) => {
    return res.json();
}).then((res) => {
    map = Highcharts.mapChart('container', {
        chart: {
            map: res,
            width: 1000,
            height: 450,
        },

        title: {
            text: 'Maquinas Registradas',
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            tickPixelInterval: 100
        },
        series: [{
            data: data,
            // cursor: 'pointer',
            keys: ['sp_nome', 'value'],
            joinBy: 'sp_nome',
            name: 'Maquinas',
            states: {
                hover: {
                    color: '#a4edba',
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.properties.sp_codigo}'
            },
            
        }]
    });
}).then(() => {
    teste = document.getElementsByClassName('highcharts-container');
    id = teste[0].style.position = 'static';
    document.getElementById('container').style.overflow = 'visible'
}).then(() => {
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
        for (var i = 0; i < maquina.length; i++) {
            geolocalizacao.push(fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${maquina[i].latitude},${maquina[i].longitude}&key=AIzaSyD9b1I0ciFyNH4UWHJdwJw5IwjgMnhlSZs`, {
                method: 'GET',
            }))
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
                        try {
                            if (discos[index].fkMaquina == maquina[i].hostName) {
                                totalArmazenamento += discos[index].espacoTotal;
                                totalDisponivel += discos[index].espacoDisponivel;
                            }
                        } catch (erro) {
                            console.log(erro);
                        }
                    }
                    var discoDisponivel = (((totalArmazenamento - totalDisponivel) * 100) / totalArmazenamento).toFixed(2)
    
                    console.log(maquina[i].hostName);
                    montaTabela(maquina[i], log[i], discoDisponivel)
                }
            })
        })
        Promise.all(geolocalizacao).then(function (response) {
            return Promise.all(response.map(function (resposta) {
                return resposta.json();
            }));
        }).then(res => {
            geo = res;
    
            MO = 0;
            MP = 0;
            GN = 0;
            JT = 0;
            for (let i = 0; i < res.length; i++) {
                if(Mooca.includes(res[i].results[0].address_components[2].long_name)){
                    MO++
                }else if(SaoMiguel.includes(res[i].results[0].address_components[2].long_name)){
                    MP++
                }else if(Guaianases.includes(res[i].results[0].address_components[2].long_name)){
                    GN++
                }else if(Jacane.includes(res[i].results[0].address_components[2].long_name)){
                    JT++
                }
            }
            map.series[0].data[17].update(["MO",MO])
            map.series[0].data[27].update(["MP",MP])
            map.series[0].data[9].update(["GN",GN])
            map.series[0].data[6].update(["JT",JT])
            console.log(res);
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
    try {
        Tr.appendChild(montaTd(dados.usoCpu));
        Tr.appendChild(montaTd(Number(((dados.usoMemoria * 100) / info.qtdMemoria).toFixed(2))));
        Tr.appendChild(montaTd(Number(disco)));
    }catch(error){
        Tr.appendChild(montaTd("error!"));
        Tr.appendChild(montaTd("error!"));
        Tr.appendChild(montaTd("error!"));
    }


    return Tr;
}

function montaTd(dado) {
    var td = document.createElement('td');
    if(typeof dado == "number"){
        td.textContent = dado  + "%";
    }else{
        td.textContent = dado;
    }
    
    if(dado == "error!" || dado >= 80){
        td.style.backgroundColor = "#fdcfca"
        td.style.color = "red"
    }else if(dado < 80 && dado > 60){
        td.style.backgroundColor = "yellow"
    }
    return td;
}