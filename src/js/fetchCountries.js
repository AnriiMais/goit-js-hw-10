import { baseURL } from './config';

// ?fields={field},{field},{field}
export const fetchCountries = name =>
  new Promise((res, rej) => {
    fetch(baseURL + `${name}` + `?fields=name,capital,population,flag,languages`)
      .then(response => {
        if (response.status >= 200 && response.status < 300);
        {
          console.log(response.status);
          return response.json();
        }
        rej();
      })
      .then(data => res(data));
  });
export const countryListMark = data => {
  const ulNode = document.querySelector('.country-list');
  const markup = data
    .map(item => {
      return `
  <li>
  <img src="${item.flag}" alt="${item.name}"/>${item.name}
  </li>
  `;
    })
    .join('');
  ulNode.innerHTML = markup;
};
export const oneCountryMark = data => {
  const divNode = document.querySelector('.country-info');
  // const cardInfo = { ...data };
};
