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

