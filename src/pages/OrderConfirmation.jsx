import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedFlightData } = location.state || {}; // Henter selectedFlight fra location.state


  console.log("Valgte flydata:", selectedFlightData); // Debugging - sørg for at data bliver logget korrekt

  return (
    <div>
      <h1>Bestilling bekræftet</h1>
      <p>Tak for din bestilling! Vi er glade for at bekræfte, at din bestilling er blevet gennemført.</p>
      <p>Vi ønsker dig en god rejse!</p>

      {selectedFlightData ? (
        <div>
          <h2>Flyinformation</h2>
          <p><strong>Udgående flyrejse:</strong> {selectedFlightData.departureCity} → {selectedFlightData.arrivalCity}</p>
          <p><strong>Indgående flyrejse:</strong> {selectedFlightData.returnFlight?.departureCity} → {selectedFlightData.returnFlight?.arrivalCity}</p>
          <p><strong>Pris:</strong> {selectedFlightData.price}</p>
        </div>
      ) : (
        <p>Ingen flyinformation tilgængelig.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
