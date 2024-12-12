import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import facade from '../util/apiFacade';

const TravelAdministration = () => {
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    // Check if the logged-in user has the 'admin' role
    if (!facade.hasUserAccess('admin', true)) {
      setUnauthorized(true);
      return; // Exit early if user is not authorized
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (unauthorized) {
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You do not have the necessary permissions to access this page.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Rejseadministration</h2>
        <p>Her kan du administrere rejser og bruge administrative funktioner.</p>
      </div>
      <Footer isSticky={true} />
    </>
  );
};

export default TravelAdministration;
