import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const InfoBoks = styled.div`
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

export default function InfoBox() {

    const location = useLocation();
    const formData = location.state; // Hent formData direkte fra state

  return (
    <>
        <InfoBoks>
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
        </InfoBoks>
    </>
  )
}
