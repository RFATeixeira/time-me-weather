"use client"
import React, { use, useEffect } from 'react';

export function Card() {
  useEffect(() => {
    const searchForm = document.querySelector<HTMLFormElement>('#search');
    if (searchForm) {
      searchForm.addEventListener('submit',async (event: Event) => {
        event.preventDefault();

        const cityInput = document.querySelector<HTMLInputElement>('#city_name');

        if (cityInput) {
          const cityName = cityInput.value;

          if (!cityName) {
            showAlert('Você precisa digitar uma cidade...');
            return;
          }
          const apiKey = `8a60b2de14f7a17c7a11706b2cfcd87c`
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

          

          try {
            const results = await fetch(apiUrl);
            if (!results.ok) {
              throw new Error('Network response was not ok');
            }
            const json = await results.json();
            
            if (json.cod === 200) {
                showInfo({
                   city: json.name,
                   country: json.sys.country,
                   temp: json.main.temp,
                   tempMax: json.main.temp_max,
                   tempMin: json.main.temp_min,
                   description: json.weather[0].description,
                   tempIcon: json.weather[0].icon,
                   windSpeed: json.wind.speed,
                   humidity: json.main.humidity,
                })
            } else {
                showAlert(`Não foi possivel localizar...`)
            }

          console.log(`Cidade digitada: ${cityName}`);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
            showAlert('Ocorreu um erro ao buscar os dados.');
          }
        } else {
          console.error('O campo de entrada #city_name não foi encontrado.');
        }
      });
    } else {
      console.error('O formulário #search não foi encontrado.');
    }
  }, []);

  function showInfo(json: any): void {
    showAlert('');

    const weatherElement = document.querySelector<HTMLElement>("#weather");
    
    if (weatherElement) {
        weatherElement.classList.remove('hidden');
        weatherElement.classList.add('block');
    }

    const titleElement = document.querySelector<HTMLElement>('#title');

    if (titleElement) {
        titleElement.innerHTML = `${json.city}, ${json.country}`;
    } else {
        console.error('Elemento com ID "title" não encontrado.');
    }

    const tempElement = document.querySelector<HTMLElement>('#temp_value');

    if (tempElement) {
        tempElement.innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')}<sup>Cº</sup>`;
    } else {
        console.error('Elemento com ID "temp" não encontrado.');
    }

    const tempDescElement = document.querySelector<HTMLElement>('#temp_description');

    if (tempDescElement) {
        tempDescElement.innerHTML = `${json.description}`;
    } else {
        console.error('Elemento com ID "description" não encontrado.');
    }

    const tempImgElement = document.querySelector<HTMLElement>('#temp_img');

    if (tempImgElement) {
        tempImgElement.setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) 
    } else {
        console.error('Elemento com ID "temp_img" não encontrado.');
    }

    const tempMaxElement = document.querySelector<HTMLElement>('#temp_max');

    if (tempMaxElement) {
        tempMaxElement.innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')}<sup>Cº</sup>`;
    } else {
        console.error('Elemento com ID "temp_max" não encontrado.');
    }

    const tempMinElement = document.querySelector<HTMLElement>('#temp_min');

    if (tempMinElement) {
        tempMinElement.innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')}<sup>Cº</sup>`;
    } else {
        console.error('Elemento com ID "temp_min" não encontrado.');
    }

    const humidityElement = document.querySelector<HTMLElement>('#humidity');

    if (humidityElement) {
        humidityElement.innerHTML = `${json.humidity}%`;
    } else {
        console.error('Elemento com ID "humidity" não encontrado.');
    }

    const windElement = document.querySelector<HTMLElement>('#wind');

    if (windElement) {
        windElement.innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
    } else {
        console.error('Elemento com ID "humidity" não encontrado.');
    }

}

    function showAlert(msg: string | undefined): void {
    const alertElement = document.querySelector<HTMLElement>('#alert');
  
    if (alertElement) {
      alertElement.innerHTML = msg ?? ''; 
    }
  }


  return (
    <div className="flex justify-center items-center min-h-[100vh] background bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-[#f0f8ff] rounded-[20px] p-[18px] drop-shadow-lg m-6">
        <form id="search" className="flex items-center gap-2 b-1 b-[#bdbdbd] rounded-[10px] py-1 px-3 ">
          <i className="fas fa-location-dot"></i>
          <input type="search" name="city_name" id="city_name" placeholder="Buscar cidade" className="w-full focus-visible:outline-none"/>
          <button type="submit"><i className="fas fa-magnifying-glass"></i></button>
        </form>

        <div id="weather" className="mt-[20px] mb-[10px] hidden">
          <h1 id="title" className="text-center font-semibold mb-[5px] text-[#372f3f] text-3xl">Umuarama, PR</h1>
          <div id="infos">
            <div id="temp" className="flex items-center justify-around gap-[20px] bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-[20px] p-[20px]">
              <img id="temp_img" className="drop-shadow-md" src="http://openweathermap.org/img/wn/04d@2x.png" alt="Imagem de temperatura"/>
              <div>
                <p id="temp_value" className="font-bold text-[50px] leading-[55px]">
                  32 <sup>Cº</sup>
                </p>
                <p id="temp_description" className="font-medium capitalize">Ensolarado</p>
              </div>
            </div>
            <div id="other_infos" className="mt-[30px] grid grid-cols-2 gap-4">
              <div className="info">
                <i id="temp_max_icon" className="fas fa-temperature-low info_icon text-[#7f1d1d]"></i>
                <div>
                  <h2 className="info_title">temp. max</h2>
                  <p id="temp_max">32 <sup>Cº</sup></p>
                </div>
              </div>
              <div className="info">
                <i id="temp_min_icon" className="fas fa-temperature-low info_icon text-[#0284c7]"></i>
                <div>
                  <h2 className="info_title">temp. min</h2>
                  <p id="temp_min">12 <sup>Cº</sup></p>
                </div>
              </div>
              <div className="info">
                <i id="humidity_icon" className="fas fa-droplet info_icon text-[#0ea5e9]"></i>
                <div>
                  <h2 className="info_title">Humidade</h2>
                  <p id="humidity">50%</p>
                </div>
              </div>
              <div className="info">
                <i id="wind_icon" className="fas fa-wind info_icon text-[#7c3aed]"></i>
                <div>
                  <h2 className="info_title">Vento</h2>
                  <p id="wind">50 km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center' id="alert"></div>
      </div>
    </div>
  );
}