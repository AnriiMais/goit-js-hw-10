import { baseURL } from './config';

export const fetchCountries = name =>
  new Promise((res, rej) => {
    fetch(baseURL + `${name}?fields=name,capital,population,flag,languages`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        rej();
      })
      .then(data => res(data));
  });
export const countryListMark = data => {
  const ulNode = document.querySelector('.country-list');
  const markup = data
    .map(item => {
      return `<li>
              <img src=${item.flag} alt=${item.name}/>${item.name}
              </li>`;
    })
    .join('');
  ulNode.innerHTML = markup;
};
export const oneCountryMark = data => {
  const divNode = document.querySelector('.country-info');

  const markupInfo = data
    .map(item => {
      const language = Object.values(item.languages[0]);

      return `
    <div class="country-card">
          <img src=${item.flag} alt=${item.name} class="country-card-img"/>
          <h2>${item.name}</h2>
        <p><b>Capital</b>: ${item.capital}</p>
        <p><b>Population</b>: ${item.population}</p>
        <p><b>Languages</b>: "${language[3]}"</p>
    </div>
    `;
    })
    .join('');
  divNode.innerHTML = markupInfo;
};
