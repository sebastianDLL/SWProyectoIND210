function reiniciar() {
    window.location.href = "entropia.html";
}

function generarInputs() {
    var cantidadComponentes = parseInt(document.getElementById('cantidadComponentes').value);
    var cantidadEstados = parseInt(document.getElementById('cantidadEstados').value);

    var proyectoForm = document.getElementById('proyectoForm');
    proyectoForm.innerHTML = '';

    for (var i = 1; i <= cantidadComponentes; i++) {
        var componenteDiv = document.createElement('div');
        componenteDiv.classList.add('componente');

        var nombreLabel = document.createElement('label');
        nombreLabel.innerHTML = 'Nombre del Componente ' + i;
        componenteDiv.appendChild(nombreLabel);

        var nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        componenteDiv.appendChild(nombreInput);

        for (var j = 1; j <= cantidadEstados; j++) {
            var probabilidadLabel = document.createElement('label');
            probabilidadLabel.innerHTML = 'Probabilidad para el Estado ' + j;
            componenteDiv.appendChild(probabilidadLabel);

            var probabilidadInput = document.createElement('input');
            probabilidadInput.id = 'inputprobabilidad'
            probabilidadInput.type = 'number';
            probabilidadInput.min = '0';
            probabilidadInput.max = '1';
            probabilidadInput.step = '0.1';
            probabilidadInput.placeholder = '0.3';
            componenteDiv.appendChild(probabilidadInput);
        }

        proyectoForm.appendChild(componenteDiv);
    }

    var calcularButton = document.createElement('button');
    calcularButton.id = 'calcularButton';
    calcularButton.innerHTML = 'Calcular';
    calcularButton.onclick = function () {
        calcularEntropia(cantidadComponentes, cantidadEstados);
    };

    document.body.appendChild(calcularButton);

    var guardarButton = document.createElement('button');
    guardarButton.id = 'guardarButton';
    guardarButton.innerHTML = 'Guardar';
    guardarButton.onclick = function () {
        guardarTablaComoImagen();
    };

    document.body.appendChild(guardarButton);

    var eliminarButton = document.createElement('button');
    eliminarButton.id = 'eliminarButton';
    eliminarButton.innerHTML = 'Borrar';
    eliminarButton.onclick = function () {
        reiniciar();
    };

    document.body.appendChild(eliminarButton);
    
}


function calcularEntropia(cantidadComponentes, cantidadEstados) {
    var resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    var tabla = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    // Encabezados de la tabla
    var encabezados = ['Componente'];
    for (var i = 1; i <= cantidadEstados; i++) {
        encabezados.push('% Estado ' + i);
    }
    encabezados.push('Entropía');

    var tr = document.createElement('tr');
    encabezados.forEach(function (encabezado) {
        var th = document.createElement('th');
        th.innerHTML = encabezado;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    tabla.appendChild(thead);

    // Datos de la tabla
    var componentes = document.querySelectorAll('.componente');
    componentes.forEach(function (componente) {
        var nombreComponente = componente.querySelector('input[type="text"]').value;
        var probabilidades = [];

        componente.querySelectorAll('input[type="number"]').forEach(function (input) {
            probabilidades.push(parseFloat(input.value));
        });

        var entropiaComponente = calcularEntropiaPorComponente(probabilidades);

        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + nombreComponente + '</td>';
        probabilidades.forEach(function (probabilidad) {
            fila.innerHTML += '<td>' + probabilidad + '</td>';
        });
        fila.innerHTML += '<td class="result">' + entropiaComponente.toFixed(5) + '</td>';

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    resultadosDiv.appendChild(tabla);

}

function calcularEntropiaPorComponente(probabilidades) {
    var entropiaComponente = 0;
    probabilidades.forEach(function (probabilidad) {
        if (probabilidad > 0) {
            entropiaComponente += probabilidad * Math.log2(1 / probabilidad);
        }
    });

    return entropiaComponente;
}

function guardarTablaComoImagen() {
    var tabla = document.querySelector('table');
    html2canvas(tabla, {allowTaint: true, useCORS: true}).then(function(canvas) {
        var blob = canvas.toBlob(function(blob) {
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.download = 'datos.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    });
}