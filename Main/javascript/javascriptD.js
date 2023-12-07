// Función para calcular los intereses y el monto final
function calculateInterest(capital, rate, years, compoundingsPerYear) {
  var interest =
    capital *
    (Math.pow(1 + rate / compoundingsPerYear, years * compoundingsPerYear) - 1);
  var finalAmount = capital + interest;
  return { interest: interest, finalAmount: finalAmount };
}

// Función principal de cálculo
function calculate() {
  var capitalInput = document.getElementById("capital");
  var yearsInput = document.getElementById("years");

  var capital = parseFloat(capitalInput.value);
  var years = parseFloat(yearsInput.value);

  if (isNaN(capital) || isNaN(years) || capital <= 0 || years <= 0) {
    alert("Por favor, ingrese valores válidos para el capital y los años.");
    return;
  }
  var rates = [0.1, 0.125, 0.15];
  var ids = ["10", "12", "15"];
  var compoundings = [1, 4, 2]; // annual, quarterly, semi-annual

  for (var i = 0; i < rates.length; i++) {
    for (var j = 0; j < compoundings.length; j++) {
      var result = calculateInterest(capital, rates[i], years, compoundings[j]);
      document.getElementById(
        "annualInterest" + ids[i] + "Compound" + compoundings[j]
      ).innerHTML = "Bs" + result.interest.toFixed(2);
    }
  }
}

// Función para calcular criterios y mostrar resultados// Función para calcular criterios y mostrar resultados
function criterios() {
    var ids = ["10", "12", "15"];
    var compoundings = [1, 4, 2]; // anual, trimestral, semestral
  
    var maxValues = compoundings.map((compound) =>
      Math.max(
        ...ids.map((id) =>
          parseFloat(
            document
              .getElementById("annualInterest" + id + "Compound" + compound)
              .innerHTML.slice(2)
          )
        )
      )
    );
    var minValues = compoundings.map((compound) =>
      Math.min(
        ...ids.map((id) =>
          parseFloat(
            document
              .getElementById("annualInterest" + id + "Compound" + compound)
              .innerHTML.slice(2)
          )
        )
      )
    );
    var avgValues = compoundings.map(
      (compound) =>
        ids.reduce(
          (sum, id) =>
            sum +
            parseFloat(
              document
                .getElementById("annualInterest" + id + "Compound" + compound)
                .innerHTML.slice(2)
            ),
          0
        ) / ids.length
    );
  
    var optimista = Math.max(...maxValues);
    var pesimista = Math.max(...minValues);
    var laplace = Math.max(...avgValues);
  
    var results = [optimista, pesimista, laplace];
    results.sort((a, b) => a - b);
  
    var closestPair = [results[0], results[1]];
    if (Math.abs(results[1] - results[2]) < Math.abs(results[0] - results[1])) {
      closestPair = [results[1], results[2]];
    }
  
    var criterio1 = closestPair[0];
    var criterio2 = closestPair[1];
    var finalResult = (criterio1 + criterio2) / 2;
  
    document.getElementById("optimista").innerHTML = "Bs" + optimista.toFixed(2);
    document.getElementById("pesimista").innerHTML = "Bs" + pesimista.toFixed(2);
    document.getElementById("laplace").innerHTML = "Bs" + laplace.toFixed(2);
  
    // Obtener la celda con el valor más cercano al resultado final
    var closestCell = findClosestCell(finalResult);
  
    // Cambiar el color de la celda
    if (closestCell) {
      closestCell.style.backgroundColor = "#99ff99"; // Puedes cambiar el color a tu elección
    }
  
    // Mostrar los criterios más cercanos en la conclusión con saltos de línea
    document.getElementById("conclusion").innerHTML =
      "<strong>DE ACUERDO A LOS CRITERIOS PESIMISTA Y LAPLACE, LA DECISIÓN ES OPTAR POR EL CRÉDITO DE Bs " +
      finalResult.toFixed(2) +
      "</strong><br><br>Los dos criterios más cercanos son: Bs" +
      criterio1.toFixed(2) +
      " y  Bs" +
      criterio2.toFixed(2);
  }
  
  // Función para encontrar la celda con el valor más cercano al resultado final
  function findClosestCell(targetValue) {
    var cells = document.querySelectorAll('td[id^="annualInterest"]');
    var closestCell = null;
    var minDifference = Infinity;
  
    cells.forEach((cell) => {
      var cellValue = parseFloat(cell.innerHTML.slice(2));
      var difference = Math.abs(cellValue - targetValue);
  
      if (difference < minDifference) {
        minDifference = difference;
        closestCell = cell;
      }
    });
  
    return closestCell;
  }
  
  
  function guardarComoImagen() {
    var container = document.querySelector('.container');

    html2canvas(container).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = imgData;
        link.download = 'Datos.png';
        link.click();
    });
}
