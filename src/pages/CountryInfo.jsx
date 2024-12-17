import { useState } from 'react';
import CountryInfo from '../components/country/CountryInfo';
import CountryMapSelection from '../components/CountryMapSelection';
import Footer from '../components/Footer';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
  margin: 0; /* Ensure no margin on the body */
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding-bottom: 0; /* Ensure no padding is pushing the footer */
`;

const CountryInfoPage = () => {
  const [currentCountryCode, setCurrentCountryCode] = useState(null);

  const handleCountryClick = (countryCode) => {
    setCurrentCountryCode(countryCode); 
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <CountryInfo 
          currentCountryCode={currentCountryCode} 
          setCurrentCountryCode={setCurrentCountryCode} 
        />
        <div className="map-container">
          <CountryMapSelection onClick={handleCountryClick} /> 
        </div>
      </ContentWrapper>
      <Footer isSticky={false} />
    </PageWrapper>
  );
};

export default CountryInfoPage;
  