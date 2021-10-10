import { fetchCountries, countryListMark } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 500;
// example
// const fetchUsersBtn = document.querySelector('.btn');
// const userList = document.querySelector('.user-list');

// fetchUsersBtn.addEventListener('click', () => {
//   fetchUsers()
//     .then(users => renderUserList(users))
//     .catch(error => console.log(error));
// });

// function fetchUsers() {
//   return fetch('https://jsonplaceholder.typicode.com/users').then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users
//     .map(user => {
//       return `<li>
//           <p><b>Name</b>: ${user.name}</p>
//           <p><b>Email</b>: ${user.email}</p>
//           <p><b>Company</b>: ${user.company.name}</p>
//         </li>`;
//     })
//     .join('');
//   userList.innerHTML = markup;
// }
// -/example
const refs = {
  inputCountryName: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
refs.inputCountryName.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
function onFormInput(e) {
  if (e.target.value === '') {
    document.querySelector('.country-list').innerHTML = '';
  } else
    fetchCountries(e.target.value)
      .then(data => {
        if (data.length > 10) {
          // Notify.info('Too many matches found. Please enter a more specific name.');
          alert('Дахуя хочеш!!!');
          return false;
        } else countryListMark(data);
        console.log(data);
      })
      .catch(error => Notify.failure('Oops, there is no country with that name'));
  // console.log(e.target.value);
}
