import PropTypes from 'prop-types';
import EuropeMap from './assets/EuropeMap';

const CountryMapSelection = ({ onClick }) => {
  const handleCountryClick = (e) => {
    const countryId = e.target.id;

    if (countryId) {
      onClick(countryId);

      const countries = document.querySelectorAll('path');
      countries.forEach((country) => {
        country.style.fill = '';
      });

      const selectedCountry = document.getElementById(countryId);
      if (selectedCountry) {
        selectedCountry.style.fill = '#FF0000';
      }
    }
  };

  return (
    <div>
      <EuropeMap
        id="svg2"
        onClick={handleCountryClick}
      />
    </div>
  );
};

CountryMapSelection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CountryMapSelection;
