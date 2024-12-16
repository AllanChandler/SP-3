import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedFlight } = location.state || {}; // For at undgå fejl, hvis der ikke er state

  return (
    <div>
      <h1>Bestilling bekræftet</h1>
      <p>Tak for din bestilling! Vi er glade for at bekræfte, at din bestilling er blevet gennemført.</p>
      <p>Vi ønsker dig en god rejse!</p>

      {selectedFlight && (
        <div>
          <h2>Flyinformation</h2>
          <p><strong>Udgående flyrejse:</strong> {selectedFlight.departureCity} → {selectedFlight.arrivalCity}</p>
          <p><strong>Indgående flyrejse:</strong> {selectedFlight.returnFlight.departureCity} → {selectedFlight.returnFlight.arrivalCity}</p>
          <p><strong>Pris:</strong> {selectedFlight.price}</p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;

