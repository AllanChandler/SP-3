import styled from 'styled-components';

const VisionWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const VisionPage = () => {
  return (
    <VisionWrapper>
      <h1>Vision of JourneyHub API</h1>
      <p>
        JourneyHub API giver brugerne adgang til et rejsesystem, hvor de kan finde destinationer, booke rejser og administrere deres planer.
        API&apos;et gør det også muligt at skrive og læse anmeldelser af forskellige destinationer, hvilket skaber en platform for feedback og anbefalinger.
        Uanset om du vil finde din næste rejse eller dele dine oplevelser, gør JourneyHub API det nemt at interagere med rejseverdenen.
      </p>
    </VisionWrapper>
  );
};

export default VisionPage;
