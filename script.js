const ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => cities.push(...data));

function findMatches(candidate, cities) {
    return cities.filter(place => {
        const rule = new RegExp(candidate, 'gi');
        return place.city.match(rule) || place.state.match(rule);
    });
}

function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const word = this.value;
    const matchesList = document.querySelector('.suggestions');
    
    if (word === '') {
        // if word is empty, clear matches
        matchesList.innerHTML = '';
    } else {
        // display matches
        const results = findMatches(word, cities);
        const html = results.map(place => {
            const matching = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(matching, `<span class="highlighted">${this.value}</span>`);
            const stateName = place.state.replace(matching, `<span class="highlighted">${this.value}</span>`);
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${formatNumber(place.population)}</span>
                </li>
            `;
        }).join('');
        matchesList.innerHTML = html;
    }
    
    
}

const input = document.querySelector('.search');

input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);