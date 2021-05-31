function getData(n) {
  var arr = [],
    i,
    x,
    a,
    b,
    c,
    spike;
  for (
    i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
    i < n;
    i = i + 1, x = x + 36e5
  ) {
    if (i % 10 === 0) {
      a = 2 * Math.random();
      b = 2 * Math.random();
      c = 2 * Math.random();
    }
    if (i % 50 === 0) {
      spike = 10;
    }
    else {
      spike = 0;
    }
    arr.push([
      x,
      2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
    ]);
  }
  return arr;
}
var n = 50,
  data = getData(n);


console.time('line');
Highcharts.chart('container-ram', {

  chart: {
    zoomType: 'x'
    color: '#ffffff'
  },

  title: {
    text: 'Uso de RAM',
    color: '#ffff'
  },

  tooltip: {
    valueDecimals: 2
  },

  xAxis: {
    type: 'datetime'
  },

  series: [{
    data: data,
    lineWidth: 1.5,
    name: 'RAM'
  }]

});
console.timeEnd('line');