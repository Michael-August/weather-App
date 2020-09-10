if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker
                .register('sw_site_main.js')
        .then(reg => console.log('serviceworker. registered'))
        .catch(err => console.log(`serviceworker: Error: ${err}`))
    })
}

let div1
let div2
let existingData = []

window.onload = function(){
    if(JSON.parse(localStorage.getItem("weather Info")) !== null){
        existingData = JSON.parse(localStorage.getItem("weather Info"))
        for(let i = 0; i <= existingData.length; i++){
            let temp = existingData[i]["main"]["temp"]
            let celcius2 = temp - 273
            wholececius2 = Math.floor(celcius2)
            div1 = document.createElement('div')
            div1.classList.add('city-icon')
            div1.innerHTML = `
            <h1 class="city-name">${ existingData[i]["name"] }</h1>
            <img src="icons/${ existingData[i]['weather'][0]['icon'] }.png">
            `

            div2 = document.createElement('div')
            div2.classList.add('temperature')
            div2.innerHTML = `
                <h1 class="temperature-degree">${ wholececius2 }</h1><span>c</span>
                <p class="temperature-description">${ existingData[i]["weather"][0]["description"] }</p>
            `
            searchSection.classList.add('margin')

            searchSection.appendChild(div1)
            searchSection.appendChild(div2)
        }
    }
}

const city = document.querySelector('.city-name')
const icon = document.querySelector('.icon')
const temperature = document.querySelector('.temperature-degree')
const cityIcon = document.querySelector('.city-icon')
const description = document.querySelector('.temperature-description')
const searchSection = document.querySelector('.searchResult')
const feel = document.querySelector('.feel')
const sun_rise = document.querySelector('.sun-rise')
const sun_set = document.querySelector('.sun-set')
const wind_speed = document.querySelector('.wind-speed')
const humidity_ = document.querySelector('.numb')
const searchHumidity = document.querySelector('.searchHumidity')

const input = document.querySelectorAll('.input')
const inputText = document.querySelector('#text')


fetch(`https://api.openweathermap.org/data/2.5/weather?q=New york&appid=fec1ab02e50be6ebc6a0a61960fe1e17`)
    .then(response => response.json())
    .then(data => {
        let nameValue = data['name']
        let temperatureValue = data['main']['temp']
        let celcius = temperatureValue - 273
        wholececius = Math.floor(celcius)
        let descValue = data['weather'][0]['description']
        let weatherIcon1 = data['weather'][0]['icon']
        let humidityValue = data['main']['humidity']
        let feelValue = data['main']['feels_like']
        let sunRise = data['sys']['sunrise']
        let sunSet = data['sys']['sunset']
        let wind = data['wind']['speed']

        const numb = document.querySelector('.numb')
        let counter = 0
        setInterval(() => {
            if(counter == humidityValue){
                clearInterval()
            }else{
                counter += 1
                numb.textContent = counter + "%"
            }
        }, 41)


        city.innerHTML = nameValue
        let image = document.createElement('img')
            image.setAttribute('src', `icons/${weatherIcon1}.png`)
            cityIcon.appendChild(image)
        
        temperature.innerHTML = `${wholececius}<span>c</span>`
        description.innerHTML = descValue
        feel.innerHTML = `feels-like: ${feelValue}`
        sun_rise.innerHTML = `sunRise: ${sunRise}`
        sun_set.innerHTML = `sunSet: ${sunSet}`
        wind_speed.innerHTML = `wind speed: ${wind}`

    })
    // .catch((err) => alert(err))

input[1].addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ inputText.value }&appid=fec1ab02e50be6ebc6a0a61960fe1e17`)
        .then(response => response.json())
        .then(data2 => {
            let nameValue2 = data2['name']
            let temperatureValue2 = data2['main']['temp']
            let celcius2 = temperatureValue2 - 273
            wholececius2 = Math.floor(celcius2)
            let descValue2 = data2['weather'][0]['description']
            let weatherIcon = data2['weather'][0]['icon']
            // let humidityValue2 = data2['main']['humidity']
            // let feelValue2 = data2['main']['feels_like']
            // let sunRise2 = data2['sys']['sunrise']
            // let sunSet2 = data2['sys']['sunset']
            // let wind2 = data2['wind']['speed']

            if(inputText === ''){
                alert('please input a valid city')
            }

            // // const numb = document.querySelector('.numb')
            // let counter = 0
            // setInterval(() => {
            // if(counter == humidityValue2){
            //     clearInterval()
            // }else{
            //     counter += 1
            // }
            // }, 41)

            div1 = document.createElement('div')
            div1.classList.add('city-icon')
            div1.innerHTML = `
            <h1 class="city-name">${ nameValue2 }</h1>
            <img src="icons/${ weatherIcon }.png">
            `

            div2 = document.createElement('div')
            div2.classList.add('temperature')
            div2.innerHTML = `
                <h1 class="temperature-degree">${ wholececius2 }</h1><span>c</span>
                <p class="temperature-description">${ descValue2 }</p>
            `
            searchSection.classList.add('margin')

            searchSection.appendChild(div1)
            searchSection.appendChild(div2)

            // let h3 = document.createElement('h3')
            // h3.innerHTML = `<h3>Humidity</h3><span>feels like:<em>${feelValue2}</em></span><br>`

            // let circularProgress = document.createElement('div')
            // circularProgress.classList.add('circular')
            // circularProgress.innerHTML = `
            //     <div class="inner"></div>
            //     <div class="numb">${humidityValue2}%</div>
            //     <div class="circle">
            //         <div class="bar left">
            //             <div class="progress"></div>
            //         </div>
            //         <div class="bar right">
            //             <div class="progress"></div>
            //         </div>
            //     </div>
            //     <br>
            // `

            // let para1 = document.createElement('p')
            // para1.innerHTML = `Sunrise: ${sunRise2}`

            // let para2 = document.createElement('p')
            // para2.innerHTML = `Sunset: ${sunSet2}`

            // let para3 = document.createElement('p')
            // para3.innerHTML = `windSpeed: ${wind2}`

            // searchHumidity.appendChild(h3)
            // searchHumidity.appendChild(circularProgress)
            // searchHumidity.appendChild(para1)
            // searchHumidity.appendChild(para2)
            // searchHumidity.appendChild(para3)

            let existingData = JSON.parse(localStorage.getItem("weather Info"));
            if(existingData === null){
                existingData = []
            }
            localStorage.setItem("weather Info", JSON.stringify(data2))
            existingData.push(data2)
            localStorage.setItem("weather Info", JSON.stringify(existingData))
        })
        .catch(err => {
            if(inputText == ''){
                alert('please provide a valid city.', err)
            }
        })
        inputText.value = ''
})
