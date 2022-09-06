const countriesList = document.getElementById("countries-list");
let countries = [];

const displayData = () => {
  countries.map(
    (country) =>
      (countriesList.innerHTML += `
      <ul>
          <img src=${country.flags.png} />
          <li>${country.name.common}</li>
          <li>${country.capital}</li>
          <li>Population : ${country.population}</li>

        </ul>
          `)
  );
};

const fetchData = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  displayData();
  console.log(countries);
};

fetchData();
