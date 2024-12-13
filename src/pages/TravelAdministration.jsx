import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import facade from '../util/apiFacade';

const TravelAdministration = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Check if the logged-in user has the 'admin' role
    if (!facade.loggedIn() || !facade.hasUserAccess('admin', facade.loggedIn())) {
      setUnauthorized(true);
      return; // Exit early if user is not logged in or does not have 'admin' role
    }

    // Fetch destinations to display
    const fetchDestinations = async () => {
      try {
        const data = await facade.fetchData('/destinations'); // Fetch all destinations
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handle deletion of a destination
  const handleDelete = async (id) => {
    try {
      // Call deleteDestination from apiFacade and ensure the request goes through
      const response = await facade.deleteDestination(id);
      
      if (response) {
        // Remove the deleted destination from the state if the request is successful
        setDestinations((prevDestinations) => 
          prevDestinations.filter(destination => destination.id !== id)
        );
        alert('Destination deleted successfully');
      } else {
        alert('Failed to delete the destination.');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('An error occurred while deleting the destination.');
    }
  };

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
        
        {/* Render destinations and provide delete button */}
        <div>
          {destinations.length > 0 ? (
            <ul>
              {destinations.map((destination) => (
                <li key={destination.id}>
                  {destination.city}, {destination.country} {/* Display destination info */}
                  <button onClick={() => handleDelete(destination.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No destinations found.</p>
          )}
        </div>
      </div>
      <Footer isSticky={true} />
    </>
  );
};

export default TravelAdministration;
