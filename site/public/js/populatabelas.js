var maquina;
var todosLogs;
var ultimoLog;
var dataCpuGlobal = []
var dataRamGlobal = []
var promises = []
fetch(`/maquina/especifica/${sessionStorage.hostName}`, {
  method: 'GET',
}).then(function (response) {
  return response.json();
}).then((res) => {
  maquina = res
  fetch(`/log/todos/${sessionStorage.hostName}`, {
    method: 'GET',
  }).then(function (response) {
    return response.json();
  }).then((res) => {
    todosLogs = res
    var dataCpu = []
    var dataRam = []
    var start = (todosLogs.length - 10);
    for (var i = start; i < todosLogs.length; i++) {
      dataCpu.push([new Date(todosLogs[i].momentoCaptura).getTime(), todosLogs[i].usoCpu])
    }
    for (var i = start; i < todosLogs.length; i++) {
      var dado = Number(((todosLogs[i].usoMemoria * 100) / maquina.qtdMemoria).toFixed(2))
      dataRam.push([new Date(todosLogs[i].momentoCaptura).getTime(), dado])
    }

    plotaGrafico(dataCpu, dataRam)
    dataCpuGlobal = dataCpu;
    dataRamGlobal = dataRam
    fetch(`/log/ultimo/${sessionStorage.hostName}`, {
      method: 'GET',
    }).then(function (response) {
      return response.json();
    }).then((res) => {
      ultimoLog = res
      chartRAM.series[0].points[0].update(Number(((ultimoLog.usoMemoria * 100) / maquina.qtdMemoria).toFixed(2)));
      chartCPU.series[0].points[0].update(ultimoLog.usoCpu)
    }).then(() => {
      document.getElementById('container').style.overflow = 'visible'
    })


    for (let index = 1; index <= maquina.qtdParticoes; index++) {
      promises.push(fetch(`/maquina/ultimaMedicaoDisco/${maquina.hostName}/${index}`, {
        method: 'GET',
      }))

    }
  }).then(() => {
    Promise.all(promises).then(function (response) {
      return Promise.all(response.map(function (resposta) {
        return resposta.json();
      }));
    }).then((res) => {
      console.log(res);
      for (let index = 0; index < res.length; index++) {
        if(res[index].espacoTotal != 0){
          var discoDisponivel = (((res[index].espacoTotal - res[index].espacoDisponivel) * 100) / res[index].espacoTotal).toFixed(2)
          ds.innerHTML += `
          <div class="disco">
            <h2>Ponto de montagem: ${res[index].pontoDeMontagem} capacidadeTotal: ${res[index].espacoTotal}gb disponivel: ${res[index].espacoDisponivel}gb</h2>
            <div class="bar">
              <div class="progress" style="width: ${discoDisponivel}%;">${discoDisponivel}%</div>
            </div>
         </div>`
        }
      }
    })
  })
})

function plotaGrafico(dataCpu, dataRam) {
  Highcharts.chart('container', {

    chart: {
      backgroundColor: '#313131',
      color: '#ffffff'
    },

    title: {
      color: '#ffffff',
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
      color: '#FFFFFF',
      text: 'Monitoramento das Máquinas'
    },

    yAxis: {
      title: {
        text: 'Leitura'
      }
    },

    xAxis: {
      type: 'datetime'
    },

    time: {
      useUTC: true
    },

    legend: {
      backgroundColor: '#ffffff',
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },

    series: [{
      name: 'CPU',
      data: dataCpu
    }, {
      color: '#ba55d3',
      name: 'RAM',
      data: dataRam
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  })
}