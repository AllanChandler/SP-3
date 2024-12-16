import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Footer from "../components/Footer";



// Styled components
const Wrapper = styled.div`
  padding: 20px;
  background-color: #f4f7fb;
  min-height: 100vh;
`;


const InfoBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 800px;
`;

const InfoItem = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const FlightOverview = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
`;

const FlightTitle = styled.h2`
  font-size: 1.8rem;
  color: #154985;
  margin-bottom: 20px;
  text-align: center;
`;

const FlightDetails = styled.div`
  margin-bottom: 20px;
`;

const FlightItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FlightInfo = styled.div`
  width: 48%;
`;

const FlightTime = styled.p`
  font-size: 1.1rem;
  margin: 5px 0;
`;

const FlightPrice = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const ConfirmBox = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 30px auto;
  text-align: center;
`;

const Button = styled.button`
  background-color: #154985;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  
  &:hover {
    background-color: #1e2d3a;
  }
`;

const DestinationsOverView = () => {
  const location = useLocation();
  const formData = location.state; // Hent formData direkte fra state
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [selectedFlight, setSelectedFlight] = useState(null);

  // For demonstration purposes, we'll simulate a flight search result based on the formData.
  const flightOptions = [
    {
      departureCity: formData.departure,
      departureTime: "12.25",
      arrivalCity: formData.destination,
      arrivalTime: "16.15",
      duration: "3 t. 50 min.",
      direct: true,
      returnFlight: {
        departureCity: formData.destination,
        departureTime: "17.50",
        arrivalCity: formData.departure,
        arrivalTime: "21.35",
        duration: "3 t. 45 min.",
        direct: true
      },
      price: "1.224 kr."
    },
    {
      departureCity: formData.departure,
      departureTime: "10.00",
      arrivalCity: formData.destination,
      arrivalTime: "14.00",
      duration: "4 t. 0 min.",
      direct: true,
      returnFlight: {
        departureCity: formData.destination,
        departureTime: "15.30",
        arrivalCity: formData.departure,
        arrivalTime: "19.00",
        duration: "3 t. 30 min.",
        direct: true
      },
      price: "1.499 kr."
    }
  ];

  // Function to handle flight selection
  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  // Funktion til at bekræfte valget og navigere til OrderConfirmation
  const handleConfirm = () => {
    const selectedFlightData = {
      ...selectedFlight,
      departureCity: formData.departure,
      arrivalCity: formData.destination,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || null,
      bookingDate: new Date().toISOString(), // Set the current date as booking date
    };
    navigate('/booking', { state: { selectedFlightData } });
  };
  

  return (
    <Wrapper>
      <InfoBox>
        {formData ? (
          <div>
            <InfoItem><strong>Afgangssted:</strong> {formData.departure}</InfoItem>
            <InfoItem><strong>Destination:</strong> {formData.destination}</InfoItem>
            <InfoItem><strong>Afrejsedato:</strong> {formData.departureDate}</InfoItem>
            {formData.tripType === 'round-trip' && (
              <InfoItem><strong>Returdato:</strong> {formData.returnDate}</InfoItem>
            )}
            <InfoItem><strong>Rejsetype:</strong> {formData.tripType === 'round-trip' ? 'Tur/Retur' : 'Enkeltvej'}</InfoItem>
          </div>
        ) : (
          <p>Ingen søgeparametre blev sendt.</p>
        )}
      </InfoBox>

      {/* Flymuligheder */}
      <FlightOverview>
        <FlightTitle>Flymuligheder</FlightTitle>
        
        {flightOptions.map((flight, index) => (
          <FlightDetails key={index}>
            <FlightItem onClick={() => handleFlightSelect(flight)}>
              <FlightInfo>
                <strong>Udgående flyrejse:</strong>
                <FlightTime>Afgang fra {flight.departureCity}: {flight.departureTime}</FlightTime>
                <FlightTime>Ankomst til {flight.arrivalCity}: {flight.arrivalTime}</FlightTime>
                <FlightTime>Flyvningens varighed: {flight.duration}</FlightTime>
                <FlightTime>{flight.direct ? 'Direkte flyvning' : 'Mellemlanding'}</FlightTime>
              </FlightInfo>
              <FlightInfo>
                <strong>Indgående flyrejse:</strong>
                <FlightTime>Afgang fra {flight.returnFlight.departureCity}: {flight.returnFlight.departureTime}</FlightTime>
                <FlightTime>Ankomst til {flight.returnFlight.arrivalCity}: {flight.returnFlight.arrivalTime}</FlightTime>
                <FlightTime>Flyvningens varighed: {flight.returnFlight.duration}</FlightTime>
                <FlightTime>{flight.returnFlight.direct ? 'Direkte flyvning' : 'Mellemlanding'}</FlightTime>
              </FlightInfo>
            </FlightItem>
          </FlightDetails>
        ))}
      </FlightOverview>

      {/* Bekræftelsesboks */}
      {selectedFlight && (
        <ConfirmBox>
          <h3>Du har valgt følgende fly:</h3>
          <FlightInfo>
            <strong>Udgående flyrejse:</strong>
            <FlightTime>Afgang fra {selectedFlight.departureCity}: {selectedFlight.departureTime}</FlightTime>
            <FlightTime>Ankomst til {selectedFlight.arrivalCity}: {selectedFlight.arrivalTime}</FlightTime>
            <FlightTime>Flyvningens varighed: {selectedFlight.duration}</FlightTime>
            <FlightTime>{selectedFlight.direct ? 'Direkte flyvning' : 'Mellemlanding'}</FlightTime>
          </FlightInfo>
          <FlightInfo>
            <strong>Indgående flyrejse:</strong>
            <FlightTime>Afgang fra {selectedFlight.returnFlight.departureCity}: {selectedFlight.returnFlight.departureTime}</FlightTime>
            <FlightTime>Ankomst til {selectedFlight.returnFlight.arrivalCity}: {selectedFlight.returnFlight.arrivalTime}</FlightTime>
            <FlightTime>Flyvningens varighed: {selectedFlight.returnFlight.duration}</FlightTime>
            <FlightTime>{selectedFlight.returnFlight.direct ? 'Direkte flyvning' : 'Mellemlanding'}</FlightTime>
          </FlightInfo>
          <FlightPrice>
            <p>Pris: {selectedFlight.price}</p>
          </FlightPrice>
          <Button onClick={handleConfirm}>Bekræft valg</Button>
        </ConfirmBox>
      )}
      <Footer isSticky={false} />
    </Wrapper>
  );
};

export default DestinationsOverView;









