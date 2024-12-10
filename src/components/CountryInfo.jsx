import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CountryInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledCountryInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CountryInfoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const CountryInfoText = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const CountryInfo = ({ currentCountryCode }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (currentCountryCode) {
      const fetchCountryData = async () => {
        try {
          const countryCode = currentCountryCode.toLowerCase().substring(0, 2);
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
          const data = await response.json();

          if (data && data[0]) {
            const country = data[0];
            setCountryData({
              name: country.name.common,
              population: country.population,
              area: country.area,
            });
          } else {
            setCountryData(null);
          }
        } catch (error) {
          console.error('Error fetching country data:', error);
          setCountryData(null);
        }
      };

      fetchCountryData();
    }
  }, [currentCountryCode]);

  return (
    <CountryInfoWrapper>
      <StyledCountryInfo>
      <CountryInfoTitle>Click on a Country in Europe to Explore Its Details</CountryInfoTitle>
      {countryData ? (
          <div>
            <CountryInfoText><strong>Name:</strong> {countryData.name}</CountryInfoText>
            <CountryInfoText><strong>Population:</strong> {countryData.population.toLocaleString()}</CountryInfoText>
            <CountryInfoText><strong>Area:</strong> {countryData.area.toLocaleString()}</CountryInfoText>
          </div>
        ) : (
          <CountryInfoText>Select a country to see its details</CountryInfoText>
        )}
      </StyledCountryInfo>
    </CountryInfoWrapper>
  );
};

CountryInfo.propTypes = {
  currentCountryCode: PropTypes.string,
};

export default CountryInfo;
