import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedFlight } = location.state || {};

  return (
    <div>
      <h1>Order Confirmation</h1>
      {selectedFlight ? (
        <div>
          <p>Du har valgt følgende fly:</p>
          <p>Udgående flyrejse: {selectedFlight.departureCity} - {selectedFlight.arrivalCity}</p>
          <p>Indgående flyrejse: {selectedFlight.returnFlight.departureCity} - {selectedFlight.returnFlight.arrivalCity}</p>
          <p>Pris: {selectedFlight.price}</p>
        </div>
      ) : (
        <p>Ingen valg er blevet bekræftet.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;




