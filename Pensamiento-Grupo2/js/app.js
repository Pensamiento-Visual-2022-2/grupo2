Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'



const printCharts = () => {

    fetchCoastersData('https://coasters-api.herokuapp.com', 'https://coasters-api.herokuapp.com/country/Spain')
        .then(([allCoasters, nationalCoasters]) => {
            renderModelsChart(allCoasters)
            renderFeaturesChart(nationalCoasters)
            renderYearsChart(allCoasters)
            enableEventHandlers(nationalCoasters)
        })

}



const renderModelsChart = coasters => {

    const uniqueModels = [...new Set(coasters.map(coaster => coaster.model))]

    const data = {
        labels: uniqueModels,
        datasets: [{
            data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'left' }
        }
    }

    new Chart('modelsChart', { type: 'doughnut', data, options })
}




const renderFeaturesChart = coasters => {

    const data = {
        labels: ["Violencia Intrafamiliar (VIF)","Víctima de delitos","Víctima de Abandono","Prácticas Abusivas Sexuales","Otras causales de Ingreso","Negligencia","Maltrato"],
        datasets: [{
            label: 'Oficina de Protección de Derechos (OPD)',
            data: [14.9,4.0,0.5,0.6,45.3,26.6,8.2],
            borderColor: getDataColors()[8],
            backgroundColor: getDataColors(20)[6]
        }]
    }
    

    const options = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            r: {
                ticks: { display: false }
            }
        }
    }

    new Chart('featuresChart', { type: 'radar', data, options })
}




const renderYearsChart = coasters => {

    const years = ['2017', '2018', '2019', '2020', '2021']

    const data = {
        labels: years,
        datasets: [{
            data: [118,119,121,112,78],
            tension: .5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 5
        }]
    }

    const options = {
        plugins: {
            legend: { display: false }
        }
    }

    new Chart('yearsChart', { type: 'line', data, options })
}



printCharts()