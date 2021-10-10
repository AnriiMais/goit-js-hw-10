import { fetchCountries, countryListMark } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 500;
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
