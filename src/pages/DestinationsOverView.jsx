import styled from 'styled-components';
import Footer from "../components/Footer";
import InfoBox from '../components/destinations/InfoBox';
import FlightOverview from '../components/destinations/FlightOverview';

// Styled components
const Wrapper = styled.div`
  padding: 20px;
  background-color: #f4f7fb;
  min-height: 100vh;
`;

const DestinationsOverView = (props) => {

  // eslint-disable-next-line react/prop-types
  const IsLoggedIn = props?.loggedIn;
  console.log("IsLoggedIn:", IsLoggedIn);
  
  return (
    <>
      <Wrapper>
        <InfoBox />
        <FlightOverview IsLoggedIn={IsLoggedIn} />
      </Wrapper>
      <Footer isSticky={false} />
    </>
  );
};

export default DestinationsOverView;














