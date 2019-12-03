/*
Filename: index.js
Authors: Justin Rignault & Thomas Sicard
Date: December 1st 2019
*/



document.addEventListener('DOMContentLoaded', init)

const APIKEY = 'c436c4ebc2f7c3960e34e4153b04bc95'

let lat 
let lon


function init() {
    getLocation()
    addButtonListeners()
}

function addButtonListeners() {
    document.getElementById('refresh').addEventListener('click', () => window.location.reload())
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
    return true
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}


function showPosition(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    
    getWeatherData(lat, lon)
}

function getWeatherData(lat, lon) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIKEY}`
    
    fetch(url)
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        createCurrentWeatherPage(data)
    })
}

function createCurrentWeatherPage(data) {
    const currentWeather = document.querySelector('.current-weather')
    const weatherIconSrc = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    const temperature = `${Math.round(data.main.temp) - 273}&deg;C`
    const tempHigh = `High: ${Math.round(data.main.temp_max) - 273}&deg;C`
    const tempLow = `Low: ${Math.round(data.main.temp_min) - 273}&deg;C`
    const humidityText = `${data.main.humidity}%`
    const visibilityText = `${Math.round(data.visibility/1000)}Km `
    const pressureText = `${data.main.pressure}hPA`
    const windText = `${(data.wind.speed * 3.6).toFixed(1)}Km/h`

    
    const div = document.createElement('div')
    div.className = 'main-info'
    
    const h3 = document.createElement('h3')
    h3.className = 'city-name'
    h3.textContent = data.name + ' Weather'
    
    
    const img = document.createElement('img')
    img.className = 'weather-icon'
    img.src = weatherIconSrc
    
    const span1 = document.createElement('span')
    span1.className = 'temperature'
    span1.innerHTML = temperature 
    
    const span2 = document.createElement('span')
    span2.className = 'temp-high'
    span2.innerHTML = tempHigh
    
    const span3 = document.createElement('span')
    span3.className = 'temp-low'
    span3.innerHTML = tempLow

    currentWeather.append(div)
    div.append(h3)
    div.append(img)
    div.append(span1)
    div.append(span2)
    div.append(span3)
    
    
    const div2 = document.createElement('div')
    div2.className = 'secondary-info'
    
    const windDiv = document.createElement('div')
    windDiv.className = 'sec-info-div'
    
    const windSpan = document.createElement('span')
    windSpan.textContent = 'Wind'
    
    const windData = document.createElement('span')
    windData.textContent = windText
        
    windDiv.append(windSpan)
    windDiv.append(windData)
    
    
    const humidityDiv = document.createElement('div')
    humidityDiv.className = 'sec-info-div'
    
    const humiditySpan = document.createElement('span')
    humiditySpan.textContent = 'Humidity'
    
    const humidityData = document.createElement('span')
    humidityData.textContent = humidityText
    
    humidityDiv.append(humiditySpan)
    humidityDiv.append(humidityData)
    
    const visibilityDiv = document.createElement('div')
    visibilityDiv.className = 'sec-info-div'
    
    visibilitySpan = document.createElement('span')
    visibilitySpan.textContent = 'Visibility'
    
    const visibilityData = document.createElement('span')
    visibilityData.textContent = visibilityText
    
    visibilityDiv.append(visibilitySpan)
    visibilityDiv.append(visibilityData)
    
    const pressureDiv = document.createElement('div')
    pressureDiv.className = 'sec-info-div'
    
    pressureSpan = document.createElement('span')
    pressureSpan.textContent = 'Pressure'
    
    const pressureData = document.createElement('span')
    pressureData.textContent = pressureText
    
    pressureDiv.append(pressureSpan)
    pressureDiv.append(pressureData)
    
    
    currentWeather.append(div2)
    div2.append(windDiv)
    div2.append(humidityDiv)
    div2.append(visibilityDiv)
    div2.append(pressureDiv)
}













