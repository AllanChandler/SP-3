import { useState } from 'react';
import CountryInfo from '../components/CountryInfo';
import CountryMapSelection from '../components/CountryMapSelection';

const CountryInfoPage = () => {
  const [currentCountryCode, setCurrentCountryCode] = useState(null);

  const handleCountryClick = (countryCode) => {
    setCurrentCountryCode(countryCode); // Update the selected country code
  };

  return (
    <div className="country-info-page">
      <CountryInfo 
        currentCountryCode={currentCountryCode} 
        setCurrentCountryCode={setCurrentCountryCode} 
      />
      <div className="map-container">
        <CountryMapSelection onClick={handleCountryClick} /> {/* This renders the map */}
      </div>
    </div>
  );
};

export default CountryInfoPage;
