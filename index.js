const countriesList = document.getElementById("countries-list");
const inputSearch = document.getElementById("inputSearch");
let countries = [];

inputSearch.addEventListener("input", (e) => {
  if (e.target.value) {
    fetchData(e.target.value);
  } else fetchData("all");
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
  if (search != "all") {
    await fetch("https://restcountries.com/v3.1/name/" + search)
      .then((res) => res.json())
      .then((data) => (countries = data));
  } else {
    await fetch("https://restcountries.com/v3.1/" + search)
      .then((res) => res.json())
      .then((data) => (countries = data));
  }

  displayData();
  console.log(countries);
};
