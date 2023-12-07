function generarInputs() {
  var cantidadComponentes = parseInt(
    document.getElementById("cantidadComponentes").value
  );

  var proyectoForm = document.getElementById("proyectoForm");
  proyectoForm.innerHTML = "";

  for (var i = 1; i <= cantidadComponentes; i++) {
    var componenteDiv = document.createElement("div");
    componenteDiv.classList.add("componente");

    // Nombre del componente
    var nombreLabel = document.createElement("label");
    nombreLabel.innerHTML = "Nombre del Componente " + i;
    componenteDiv.appendChild(nombreLabel);
    var nombreInput = document.createElement("input");
    nombreInput.type = "text";
    componenteDiv.appendChild(nombreInput);

    // Valor Entrópico del componente
    var valorEntropicoLabel = document.createElement("label");
    valorEntropicoLabel.innerHTML = "Valor Entrópico del Componente " + i;
    componenteDiv.appendChild(valorEntropicoLabel);
    var valorEntropicoInput = document.createElement("input");
    valorEntropicoInput.type = "number";
    valorEntropicoInput.min = "0";
    valorEntropicoInput.max = "1";
    valorEntropicoInput.step = "0.1";
    componenteDiv.appendChild(valorEntropicoInput);

    // Valor Homeostático del componente
    var valorHomeostaticoLabel = document.createElement("label");
    valorHomeostaticoLabel.innerHTML = "Valor Homeostático del Componente " + i;
    componenteDiv.appendChild(valorHomeostaticoLabel);
    var valorHomeostaticoInput = document.createElement("input");
    valorHomeostaticoInput.type = "number";
    valorHomeostaticoInput.min = "0";
    valorHomeostaticoInput.max = "1";
    valorHomeostaticoInput.step = "0.1";
    componenteDiv.appendChild(valorHomeostaticoInput);

    proyectoForm.appendChild(componenteDiv);
  }

  // Establecer flexbox para los divs de componente
  var componentes = document.querySelectorAll(".componente");
  componentes.forEach(function (componente) {
    componente.style.display = "flex";
    componente.style.flexDirection = "row";
    componente.style.alignItems = "center";
    componente.style.marginBottom = "10px";
  });

  // Resto del código
  var calcularButton = document.createElement("button");
  calcularButton.type = "button"; // Añade esta línea
  calcularButton.innerHTML = "Calcular";
  calcularButton.onclick = function () {
    calcularFactibilidad(cantidadComponentes);
  };
  proyectoForm.appendChild(calcularButton);
}

function calcularFactibilidad(cantidadComponentes) {
  var resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  var componentes = document.querySelectorAll(".componente");
  var valoresEntropicos = [];
  var valoresHomeostaticos = [];
  componentes.forEach(function (componente) {
    var inputs = componente.querySelectorAll('input[type="number"]');
    valoresEntropicos.push(parseFloat(inputs[0].value));
    valoresHomeostaticos.push(parseFloat(inputs[1].value));
  });

  // Calculamos los promedios
  var promedioEntropico =
    valoresEntropicos.reduce((a, b) => a + b, 0) / cantidadComponentes;
  var promedioHomeostatico =
    valoresHomeostaticos.reduce((a, b) => a + b, 0) / cantidadComponentes;

  // Mostrar los promedios
  var promediosDiv = document.createElement("div");
  promediosDiv.id = "promedios";
  promediosDiv.style.textAlign = "center";
  promediosDiv.innerHTML =
    "<strong>Promedio Entrópico:</strong> " +
    promedioEntropico.toFixed(2) +
    "<br><strong>Promedio Homeostático:</strong> " +
    promedioHomeostatico.toFixed(2);
  resultadosDiv.appendChild(promediosDiv);

  // Clasificamos los componentes
  var tabla = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  // Encabezados de la tabla
  var encabezados = [
    "Componente",
    "Valor Entrópico",
    "Valor Homeostático",
    "Tipo",
  ];
  var tr = document.createElement("tr");
  encabezados.forEach(function (encabezado) {
    var th = document.createElement("th");
    th.innerHTML = encabezado;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  tabla.appendChild(thead);

  // Datos de la tabla
  componentes.forEach(function (componente, i) {
    var valorEntropico = valoresEntropicos[i];
    var valorHomeostatico = valoresHomeostaticos[i];
    var tipo;

    if (
      (valorEntropico > promedioEntropico &&
        valorHomeostatico > promedioHomeostatico) ||
      (valorEntropico < promedioEntropico &&
        valorHomeostatico < promedioHomeostatico)
    ) {
      tipo = "INCERTIDUMBRE";
    } else if (
      valorEntropico > promedioEntropico &&
      valorHomeostatico < promedioHomeostatico
    ) {
      tipo = "ENTROPICO";
    } else {
      tipo = "HOMEOSTATICO";
    }

    var fila = document.createElement("tr");
    fila.classList.add(tipo);
    fila.innerHTML =
      "<td>" +
      componente.querySelector('input[type="text"]').value +
      "</td>" +
      "<td>" +
      valorEntropico.toFixed(2) +
      "</td>" +
      "<td>" +
      valorHomeostatico.toFixed(2) +
      "</td>" +
      "<td>" +
      tipo +
      "</td>";

    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  resultadosDiv.appendChild(tabla);

  // ...

  // Contenedor para los botones
  var botonesContainer = document.createElement("div");
  botonesContainer.style.textAlign = "center";

  // Botón "Guardar"
  var guardarButton = document.createElement("button");
  guardarButton.innerHTML = "Guardar";
  guardarButton.onclick = function () {
    var tabla = document.querySelector("table");
    html2canvas(tabla).then(function (canvas) {
      var link = document.createElement("a");
      link.download = "tabla.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };
  guardarButton.style.display = "inline-block";
  guardarButton.style.margin = "10px";
  guardarButton.style.padding = "10px";
  guardarButton.style.backgroundColor = "#007BFF";
  guardarButton.style.color = "white";
  botonesContainer.appendChild(guardarButton);

  // Botón "Reiniciar"
  var reiniciarButton = document.createElement("button");
  reiniciarButton.innerHTML = "Reiniciar";
  reiniciarButton.onclick = function () {
    location.reload();
  };
  reiniciarButton.style.display = "inline-block";
  reiniciarButton.style.margin = "10px";
  reiniciarButton.style.padding = "10px";
  reiniciarButton.style.backgroundColor = "#007BFF";
  reiniciarButton.style.color = "white";
  botonesContainer.appendChild(reiniciarButton);

  // Botón "Volver al menú"
  var volverButton = document.createElement("button");
  volverButton.innerHTML = "Volver al menú";
  volverButton.onclick = function () {
    location.href = "../index.html";
  };
  volverButton.style.display = "inline-block";
  volverButton.style.margin = "10px";
  volverButton.style.padding = "10px";
  volverButton.style.backgroundColor = "#007BFF";
  volverButton.style.color = "white";
  botonesContainer.appendChild(volverButton);

  resultadosDiv.appendChild(botonesContainer);

  // ...
  // Contamos los componentes homeostáticos
  var componentesHomeostaticos = document.querySelectorAll(".HOMEOSTATICO");
  var cantidadHomeostaticos = componentesHomeostaticos.length;

  // Calculamos el porcentaje de factibilidad
  var porcentajeFactibilidad =
    (cantidadHomeostaticos / cantidadComponentes) * 100;

  // Mostramos el porcentaje de factibilidad dentro del div con id "promedios"
  var promediosDiv = document.getElementById("promedios");
  var factibilidadDiv = document.createElement("div");
  factibilidadDiv.innerHTML =
    "<strong>Porcentaje de factibilidad del proyecto: </strong>" +
    porcentajeFactibilidad.toFixed(2) +
    "%";
  promediosDiv.appendChild(factibilidadDiv);
}
