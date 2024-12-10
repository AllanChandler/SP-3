import styled from 'styled-components';
import logo from '../assets/logo.png';  

const MainWrapper = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f4f4f9;
`;

const Logo = styled.img`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2a3d4f;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
`;

const MainPage = () => {
  return (
    <MainWrapper>
      <Logo src={logo} alt="JourneyHub Logo" />
      <Title>Velkommen til JourneyHub</Title>
      <Description>
        JourneyHub API er din perfekte rejsepartner til at finde spændende destinationer, booke rejser og dele rejseoplevelser. 
        Udforsk vores API for at få adgang til destinationer, bookingsystemer og anmeldelser alt sammen på et sted. 
        Planlæg din næste rejse nemt og hurtigt med JourneyHub!
      </Description>
    </MainWrapper>
  );
};

export default MainPage;
