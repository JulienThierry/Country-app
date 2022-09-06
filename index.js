const countriesList = document.getElementById("countries-list");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
let countries = [];
let arrayLength;
let input;

inputSearch.addEventListener("input", (e) => {
  if (e.target.value) {
    input = e.target.value;
    fetchData(e.target.value);
  } else fetchData();
});

inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = e.target.value;
  arrayLength = e.target.value;
  fetchData(input);
});

const displayData = () => {
  countriesList.innerHTML = "";
  countries.map(
    (country) =>
      (countriesList.innerHTML += `
      <ul>
          <img src=${country.flags.png} />
          <li>${country.name.official}</li>
          <li>${country.capital}</li>
          <li>Population : ${country.population}</li>

        </ul>
          `)
  );
};

const fetchData = async (search) => {
  if (search !== undefined) {
    await fetch("https://restcountries.com/v3.1/name/" + search)
      .then((res) => res.json())
      .then((data) => (countries = data));
  } else {
    await fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => (countries = data));
  }
  if (arrayLength !== undefined) {
    countries.length = arrayLength;
  }
  displayData();
  console.log(countries);
};
