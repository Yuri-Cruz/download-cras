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
    var start = (todosLogs.length - todosLogs.length);
    for (var i = start; i < todosLogs.length; i++) {
      dataCpu.push([new Date(todosLogs[i].momentoCaptura).getTime(), todosLogs[i].usoCpu])
    }
    for (var i = start; i < todosLogs.length; i++) {
      var dado = Number(((todosLogs[i].usoMemoria * 100) / maquina.qtdMemoria).toFixed(2))
      dataRam.push([new Date(todosLogs[i].momentoCaptura).getTime(), dado])
    }

    plotaGrafico(dataCpu, dataRam)
    dataCpuGlobal = dataCpu;
    dataRamGlobal = dataRam;

    for (let index = 1; index <= maquina.qtdParticoes; index++) {
      promises.push(fetch(`/maquina/ultimaMedicaoDisco/${maquina.hostName}/${index}`, {
        method: 'GET',
      }))

    }
  }).then(() => {
    document.getElementById('container').style.overflow = 'visible'
    Promise.all(promises).then(function (response) {
      return Promise.all(response.map(function (resposta) {
        return resposta.json();
      }));
    }).then((res) => {
      console.log(res);
      for (let index = 0; index < res.length; index++) {
        if (res[index].espacoTotal != 0) {
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

function plotaGrafico(dataRam, dataCpu) {
  Highcharts.chart('container-ram', {

    chart: {
      zoomType: 'x',
      borderRadius: '10px',
      backgroundColor: '#000000'
    },

    title: {
      text: 'Dados RAM',
      style: {
        color: '#b455d3'
      }
    },

    yAxis: {
      title: {
        text: 'Leitura RAM',
        style: {
          color: '#b455d3'
        }
      },
      labels: {
        style: {
          color: '#ffff'
        }
      }
    },

    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: '#ffff'
        }
      }
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
    tooltip: {
      valueDecimals: 2
    },
    series: [{
      color: '#b455d3',
      lineWidth: 1.5,
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


  });
  Highcharts.chart('container', {

    chart: {
      zoomType: 'x',
      borderRadius: '10px',
      backgroundColor: '#000000'
    },

    title: {
      text: 'Dados CPU',
      style: {
        color: '#b455d3'
      }
    },

    yAxis: {
      title: {
        text: 'Leitura CPU',
        style: {
          color: '#b455d3'
        }
      },
      labels: {
        style: {
          color: '#ffff'
        }
      }
    },

    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: '#ffff'
        }
      }
    },
    tooltip: {
      valueDecimals: 2
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