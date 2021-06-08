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
})

console.log(sessionStorage.cnpj);