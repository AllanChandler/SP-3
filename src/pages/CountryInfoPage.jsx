import { useState } from 'react';
import CountryInfo from '../components/CountryInfo'; 
import EuropeMap from '../assets/EuropeMap'; 

const CountryInfoPage = () => {
  const [currentCountryCode, setCurrentCountryCode] = useState(null);

  const handleCountryClick = (countryCode) => {
    setCurrentCountryCode(countryCode); 
  };

  return (
    <div className="country-info-page">
      <h1>Country Information</h1>
      <CountryInfo currentCountryCode={currentCountryCode} setCurrentCountryCode={setCurrentCountryCode} />
      <div className="map-container">
        <EuropeMap onClick={handleCountryClick} />
      </div>
    </div>
  );
};

export default CountryInfoPage;
