const apiURL = "https://mindicador.cl/api/"
const input = document.querySelector('#pesos');
const select = document.querySelector('#tipo');
const ctx = document.getElementById('myChart');
const button = document.querySelector('#buscar');

let chart;

async function getMoney() {
    try {
        const endPoint = apiURL + select.value;
        const res = await fetch(endPoint);
        const coins = await res.json();
        calculo(coins);
        mostrarInfo(coins);
    } catch (error) {
        alert("Algo anda mal, intentalo mas tarde");

    }
}


// Calculo para conversor de monedas

function calculo(data) {
    let arrayCalculoFinal = [];
    for (i = 0; i < 1; i++) {
        arrayCalculoFinal.push(data.serie[i]);
    }

    calcular(arrayCalculoFinal);
}

function calcular(data) {
    const resultado = document.querySelector("#resultadoF");
    const selectValue = data.map((e) => {
        return e.valor;
    });
    const inputValue = parseFloat(input.value);
    const result = inputValue / selectValue;
    const resultConComa = result.toFixed(2).replace(".", ",")
    resultado.innerHTML = "$" + resultConComa; // Limitado a 2 decimales
    
}


    // Filtro fechas
    function mostrarInfo(data) {

        let arrayInfo = [];

        for (i = 0; i < 10; i++) {

            arrayInfo.push(data.serie[i]);
        }

        console.log(arrayInfo);
        renderCanvas(arrayInfo);
    }


    // Creando el grafico
    function renderCanvas(data) {

        if (chart) {
            chart.destroy();  // si chart existe, lo destruye
        }

        const labels = data.map((element) => {
            return element.fecha.slice(0, 10); // slice elimina caracteres
        });

        labels.reverse();

        const datos = data.map((element) => {
            return element.valor;
        })

        datos.reverse();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${select.value}`,
                    data: datos,
                    borderWidth: 1
                }]
            },
            options: { color: ['white'],
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }

//Evento de Boton

button.addEventListener("click", async () => {
    if (input.value < 0 || input.value == "") {
        alert("Revisa el valor a consultar!")
    } else {
        getMoney();
}});
