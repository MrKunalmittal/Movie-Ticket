'use strict';

// importing utility functions
import { select,print } from "./utils.js";

// basic setup
const options = { 
    method: 'GET',
    headers:{ 'Contect-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
};

const movieInput = select('.movieInput')
const movieList = select('.movieList');
const movieResults = select('.movie-Results');
const movieUrl = './assests/script/movies.json';

const cityInput = select('.cityInput');
const cityResults = select('.city-Results');
const citiesUrl = './assests/script/cities.json';

/*------------------------fetching-city-------------------------- */

fetch(citiesUrl)
  .then(response => response.json())
  .then(data => {
    const cityNames = data.cities.map(city => city.name);
    autocomplete(cityInput, cityNames);
});


/*------------------------fetching-movie-------------------------- */

fetch(movieUrl)
  .then(response => response.json())
  .then(data => {
   
    let movieListHTML = '';

    data.movies.forEach(movie => {
      movieListHTML += `
        <div class="movie">
        <img src="${movie.img}" alt="${movie.title}">
        <h3>${movie.title}  (${(movie.year)})</h3>        
        </div>
      `;
      print(data);
    });

    movieList.innerHTML = movieListHTML;
});

//
cityInput.addEventListener('input', async () => {
    if (cityInput.value.length > 1) {
        const inputValue = cityInput.value.toLowerCase();
  
        cityResults.innerHTML = '';
  
        const response = await fetch(citiesUrl, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const cityNames = [];
        for (let i = 0; i < data.cities.length; i++) {
            let cityName = data.cities[i].name;
            cityNames.push(cityName);
        }
  
        const filteredCities = cityNames.filter(city => {
            return city.toLowerCase().includes(inputValue);
        })
  
        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                const newElement = document.createElement('a');
                newElement.href = '#';
                newElement.textContent = city;
                newElement.addEventListener('click', () => {
                    cityInput.value = newElement.textContent;
                    cityResults.innerHTML = '';
                })
                cityResults.appendChild(newElement);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'City not found';
            cityResults.appendChild(defaultResult);
        }
    } else {
        cityResults.innerHTML = '';
    }
  });

  // movies
  movieInput.addEventListener('input', async () => {
    if (movieInput.value.length > 1) {
        const inputValue = movieInput.value.toLowerCase();
  
        movieResults.innerHTML = '';
  
        const response = await fetch(movieUrl, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const movieTitles = [];
        for (let i = 0; i < data.movies.length; i++) {
            let movieName = data.movies[i].title;
            movieTitles.push(movieName);
        }
        
        const filteredMovies = movieTitles.filter(movie => {
            return movie.toLowerCase().includes(inputValue);
        })
  
        if (filteredMovies.length > 0) {
            filteredMovies.forEach(movie => {
                const newElement = document.createElement('a');
                newElement.href = '#';
                newElement.textContent = movie;
                newElement.addEventListener('click', () => {
                    movieInput.value = newElement.textContent;
                    movieResults.innerHTML = '';
                })
                movieResults.appendChild(newElement);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'Movie not found';
            movieResults.appendChild(defaultResult);
        }
    } else {
        movieResults.innerHTML = '';
    }
  });
  