let allCountries = [];
let selectedCountryCode = '';

const loadCountries = () => {
    document.getElementById('loader').style.display = 'block';
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            allCountries = data;
            displayCountries(data);
            document.getElementById('loader').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
            document.getElementById('loader').style.display = 'none';
        });
}

const displayCountries = countries => {
    const countriesContainer = document.getElementById('countries-container');
    countriesContainer.innerHTML = ''; // Clear any existing content

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country-list');
        if (country.cca2 === selectedCountryCode) {
            countryDiv.classList.add('selected');
        }
        countryDiv.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <h2 class="country-name">${country.name.official}</h2>
            <p>Known Name: ${country.name.common}</p>
            <p>Capital: ${country.capital ? country.capital[0] : 'No Capital'}</p>
            <button class="btn-details" onclick="loadCountryDetails('${country.cca2}')">Details</button>
        `;
        countriesContainer.appendChild(countryDiv);
    });
}

const loadCountryDetails = countryCode => {
    selectedCountryCode = countryCode;
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data[0]))
        .catch(error => console.error('Error fetching country details:', error));
}

const displayCountryDetail = country => {
    const countryDetail = document.getElementById('country-details');
    countryDetail.innerHTML = ''; // Clear previous details
    const countryDetailDiv = document.createElement('div');
    countryDetailDiv.innerHTML = `
        <h2>Official Name: ${country.name.official}</h2>
        <h3>Known As: ${country.name.common}</h3>
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
        <p>Currencies: ${Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
    `;
    countryDetail.appendChild(countryDetailDiv);
    openModal();
}

const filterCountries = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchInput) || 
        country.name.official.toLowerCase().includes(searchInput)
    );
    displayCountries(filteredCountries);
}

const openModal = () => {
    document.getElementById('country-modal').style.display = 'block';
}

const closeModal = () => {
    document.getElementById('country-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('country-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

loadCountries();
