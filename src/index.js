import { fetchCountries, countryListMark, oneCountryMark } from './js/fetchCountries';
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
  const name = e.target.value.trim();
  document.querySelector('.country-list').innerHTML = '';
  document.querySelector('.country-info').innerHTML = '';
  if (name !== '') {
    fetchCountries(name)
      .then(data => {
        if (data.length === 1) oneCountryMark(data);
        else if (data.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');

          return false;
        } else countryListMark(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops, there is no country with that name');
      });
  }
}
