var myChart;

function calculate() {
    var x = parseFloat(document.getElementById('prob').value);
    var r = parseFloat(document.getElementById('years').value);
    var iterations = parseInt(document.getElementById('iterations').value);
    var results = [];
    var labels = [];
    var data = [];
    for (var i = 0; i < iterations; i++) {
        var result = r * x * (1 - x);
        results.push(result);
        labels.push(i);
        data.push(result);
        x = result;
    }
    var table = document.getElementById('result');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (var i = 0; i < results.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i;
        cell2.innerHTML = r;
        cell3.innerHTML = results[i];
    }
    var ctx = document.getElementById('chart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Homeostasis',
                data: data,
                fill: false,
                backgroundColor: 'rgb(255,255,255)',
                borderColor: 'rgb(255,255,255)',
                tension: 0.1
            }]
        }
    });
    var moda = mode(results);
    document.getElementById('moda').innerHTML = 'La moda de los resultados es: ' + moda;
}

function mode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    if (maxCount === 1) {
        var median = array.sort()[Math.floor(array.length / 2)];
        var closest = array.reduce(function (prev, curr) {
            return (Math.abs(curr - median) < Math.abs(prev - median) ? curr : prev);
        });
        return 'Todos los valores de Y se repiten una sola vez, pero el valor más cercano a todos es: ' + closest;
    }
    return maxEl;
}

function borrarTodo() {
    document.getElementById('prob').value = '';
    document.getElementById('years').value = '';
    document.getElementById('iterations').value = '';
    var table = document.getElementById('result');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (myChart) {
        myChart.destroy();
    }
    document.getElementById('moda').innerHTML = '';
}

function guardarDatos() {
    var x = parseFloat(document.getElementById('prob').value);
    var r = parseFloat(document.getElementById('years').value);
    var iterations = parseInt(document.getElementById('iterations').value);
    var results = [];
    var labels = [];
    var data = [];
    for (var i = 0; i < iterations; i++) {
        var result = r * x * (1 - x);
        results.push(result);
        labels.push(i);
        data.push(result);
        x = result;
    }
    var table = document.getElementById('result');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (var i = 0; i < results.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i;
        cell2.innerHTML = r;
        cell3.innerHTML = results[i];
    }
    var ctx = document.getElementById('chart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Homeostasis',
                data: data,
                fill: false,
                borderColor: 'rgb(255,255,255)',
                tension: 0.1
            }]
        }
    });
    var moda = mode(results);
    document.getElementById('moda').innerHTML = 'La moda de los resultados es: ' + moda;
    var data = {
        labels: labels,
        datasets: [{
            label: 'Homeostasis',
            data: data,
            fill: false,
            borderColor: 'rgb(255,255,255)',
            tension: 0.1
        }]
    };


    setTimeout(function () {
        var img = new Image();
        img.src = document.getElementById('chart').toDataURL();

        var a = document.createElement('a');
        a.download = "graficoComponente.png";
        a.href = img.src;
        a.click();
    }, 1000); // Espera 1 segundo antes de descargar la imagen


}

function volveralMenu() {
    window.location.href = "../index.html";
}