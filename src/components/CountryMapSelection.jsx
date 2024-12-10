import PropTypes from 'prop-types';
import EuropeMap from '../assets/EuropeMap';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 680px;  /* Set width to 680px */
  height: 520px; /* Set height to 520px */
  margin: 20px auto; /* Centering the map */
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    <MapContainer>
      <EuropeMap onClick={handleCountryClick} />
    </MapContainer>
  );
};

CountryMapSelection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CountryMapSelection;
