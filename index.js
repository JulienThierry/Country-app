const countriesList = document.getElementById("countries-list");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const btnSort = document.querySelectorAll(".btnSort");
let countries = [];
let sortMethod = "alpha";

const displayData = () => {
  countriesList.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
      <ul>
          <img src=${country.flags.svg} alt =" drapeau ${
          country.translations.fra.common
        }"/>
          <li>${country.translations.fra.common}</li>
          <li>${country.capital}</li>
          <li>Population : ${country.population.toLocaleString()}</li>
        </ul>
          `
    );
};

const fetchData = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
};

inputSearch.addEventListener("input", () => {
  displayData();
});

inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = e.target.value;
  displayData();
});

window.addEventListener("load", fetchData());

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    displayData();
  });
});
