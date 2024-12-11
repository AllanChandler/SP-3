import styled from 'styled-components';
import Footer from '../components/Footer';

const VisionWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const VisionPage = () => {
  return (
    <>
      <VisionWrapper>
        <h1>Vision for JourneyHub</h1>
        <p>
          Velkommen til JourneyHub – din personlige rejsepartner! Hos os kan du nemt finde spændende destinationer, booke din næste drømmerejse og holde styr på dine rejseplaner. 
          Vi tilbyder en platform, hvor du både kan opdage nye steder og dele dine egne oplevelser med andre rejsende.
        </p>
        <p>
          JourneyHub gør det muligt for dig at:
        </p>
        <p>
          • Opdage unikke destinationer – Find den perfekte rejse til steder, der inspirerer dig.
        </p>
        <p>
          • Booke rejser hurtigt og nemt – Planlæg og book dine rejser direkte, så du er klar til næste eventyr.
        </p>
        <p>
          • Administrere dine rejseplaner – Hold styr på dine afrejse- og ankomsttider, og tilpas din rejse efter behov.
        </p>
        <p>
          • Dele dine rejseoplevelser – Skriv og læs anmeldelser for at hjælpe andre med at vælge de bedste rejsemål og få værdifulde anbefalinger.
        </p>
        <p>
          Uanset om du er på udkig efter din næste ferie, weekendtur eller bare vil dele din feedback med andre eventyrlystne rejsende, gør <strong>JourneyHub</strong> det enkelt og hurtigt at udforske verden og dele dine oplevelser.
        </p>
        <p>
          Oplev verden med os – det er kun et klik væk!
        </p>
      </VisionWrapper>
      <Footer isSticky={true} />
    </>
  );
};

export default VisionPage;
