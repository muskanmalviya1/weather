const apiKey = '3a7c899cb7369348bc81b135fd35938b'; 
//search any one  
function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (city === '') 
    {
    alert('enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200)
         {
        document.getElementById('weatherOutput').innerHTML = 'City not found.';
        return;
      }

      document.getElementById('weatherOutput').innerHTML = `
        <h3>${data.name}</h3>

        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
      `;

      addToHistory(city);
    })
    .catch(error => {
      document.getElementById('weatherOutput').innerHTML = 'Error fetching data.';
    });
}

//yha history ko add karna hai
function addToHistory(city) 
{
  const list = document.getElementById('history');
  const item = document.createElement('li');
  item.textContent = city;
  list.prepend(item);
}

// Show 5 fixed Indian cities
function showFiveCities() {
  const cities = ['Bhopal', 'Indore', 'Pune', 'Mumbai', 'Delhi'];
  const container = document.getElementById('fiveCities');
  container.innerHTML = '';

  cities.forEach(city => 
    {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const div = document.createElement('div');
        div.className = 'cityBox';
        div.innerHTML = `
          <h3>${data.name}</h3>
          <p>${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}°C</p>
        `;
        container.appendChild(div);
      });
  });
}

showFiveCities();
