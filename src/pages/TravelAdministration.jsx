import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import facade from '../util/apiFacade';
import styled from 'styled-components';

const Box = styled.div`
  background-color: #efeded;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  margin: 30px auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #154985;
`;

const Text = styled.p`
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: #123a6d;
  margin-top: 30px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #154985;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  background-color: #154985;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: #123a6d;
  }
`;

const Input = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid silver;
  margin: 5px;
  width: 300px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const AddButton = styled(Button)`
  margin-top: 10px;
`;

const UnauthorizedMessage = styled.div`
  text-align: center;
  color: red;
`;

const DestinationButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TravelAdministration = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newDestination, setNewDestination] = useState({
    city: '',
    country: '',
  });
  const [updateDestination, setUpdateDestination] = useState({
    id: null,
    city: '',
    country: '',
  });
  const [isAddingDestination, setIsAddingDestination] = useState(false);

  useEffect(() => {
    if (!facade.loggedIn() || !facade.hasUserAccess('admin')) {
      setUnauthorized(true);
      return;
    }

    const fetchDestinations = async () => {
      try {
        const data = await facade.fetchData('/destinations');
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const data = await facade.fetchData('/reviews');
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const data = await facade.fetchData('/bookings');
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchDestinations();
    fetchReviews();
    fetchBookings();
  }, []);

  const handleDeleteDestination = async (id) => {
    const bookingsForDestination = bookings.filter(booking => booking.destinationId === id);
    if (bookingsForDestination.length > 0) {
      alert('You cannot delete this destination because it is associated with bookings.');
      return;
    }

    try {
      await facade.deleteDestination(id);
      setDestinations(destinations.filter(destination => destination.id !== id));
      alert('Destination deleted successfully');
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('An error occurred while deleting the destination.');
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await facade.deleteReview(id);
      setReviews(reviews.filter(review => review.id !== id));
      alert('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('An error occurred while deleting the review.');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await facade.deleteBooking(id);
      setBookings(bookings.filter(booking => booking.id !== id));
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('An error occurred while deleting the booking.');
    }
  };

  const handleUpdateDestination = async () => {
    try {
      await facade.updateDestination(updateDestination.id, updateDestination);
      setDestinations(destinations.map((destination) =>
        destination.id === updateDestination.id ? updateDestination : destination
      ));
      alert('Destination updated successfully');
      setUpdateDestination({ id: null, city: '', country: '' });
    } catch (error) {
      console.error('Error updating destination:', error);
      alert('An error occurred while updating the destination.');
    }
  };

  const handleAddDestination = async () => {
    try {
      const newDest = await facade.addDestination(newDestination);
      setDestinations([...destinations, newDest]);
      setNewDestination({ city: '', country: '' });
      setIsAddingDestination(false);
      alert('Destination added successfully');
    } catch (error) {
      console.error('Error adding new destination:', error);
      alert('An error occurred while adding the new destination.');
    }
  };

  const formatDate = (dateString, isBookingDate = false) => {
    // Create the date object with adjusted month (subtracting 1 for 0-indexed month)
    const date = new Date(dateString[0], dateString[1] - 1, dateString[2], dateString[3] || 0, dateString[4] || 0, dateString[5] || 0);
    
    // Check if the date is valid
    if (isNaN(date)) {
      return 'Invalid Date'; 
    }
  
    // Format the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    // If it's a booking date, return only the "YYYY-MM-DD" format
    if (isBookingDate) {
      return `${year}-${month}-${day}`;
    }
  
    // Otherwise, format the time (hours, minutes, and seconds) for other dates
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Return the full date with time in "YYYY-MM-DD HH:mm:ss" format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  

  if (unauthorized) {
    return (
      <UnauthorizedMessage>
        <h2>Unauthorized</h2>
        <p>You do not have the necessary permissions to access this page.</p>
      </UnauthorizedMessage>
    );
  }

  return (
    <Box>
      <Title>Rejseadministration</Title>
      <Text>Her kan du administrere rejser og bruge administrative funktioner.</Text>

      <div>
        <DestinationButtonsContainer>
          <Button onClick={() => setIsAddingDestination(!isAddingDestination)}>
            {isAddingDestination ? 'Cancel' : 'Add'}
          </Button>
        </DestinationButtonsContainer>

        {isAddingDestination && (
          <div>
            <Text>Add New Destination</Text>
            <FormContainer>
              <Input
                type="text"
                placeholder="City"
                value={newDestination.city}
                onChange={(e) => setNewDestination({ ...newDestination, city: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Country"
                value={newDestination.country}
                onChange={(e) => setNewDestination({ ...newDestination, country: e.target.value })}
              />
              <AddButton onClick={handleAddDestination}>Add Destination</AddButton>
            </FormContainer>
          </div>
        )}
      </div>

      <TableContainer>
        <SectionTitle>Destinations</SectionTitle>
        {destinations.length > 0 ? (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>City</TableHeader>
                <TableHeader>Country</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {destinations.sort((a, b) => a.id - b.id).map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>{destination.id}</TableCell>
                  <TableCell>{destination.city}</TableCell>
                  <TableCell>{destination.country}</TableCell>
                  <TableCell>
                    <Button onClick={() => setUpdateDestination({ id: destination.id, city: destination.city, country: destination.country })}>
                      Update
                    </Button>
                    <Button onClick={() => handleDeleteDestination(destination.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No destinations found.</p>
        )}
      </TableContainer>

      {updateDestination.id && (
        <div>
          <Text>Update Destination</Text>
          <FormContainer>
            <Input
              type="text"
              value={updateDestination.city}
              onChange={(e) => setUpdateDestination({ ...updateDestination, city: e.target.value })}
            />
            <Input
              type="text"
              value={updateDestination.country}
              onChange={(e) => setUpdateDestination({ ...updateDestination, country: e.target.value })}
            />
            <AddButton onClick={handleUpdateDestination}>Update</AddButton>
          </FormContainer>
        </div>
      )}

      <TableContainer>
        <SectionTitle>Reviews</SectionTitle>
        {reviews.length > 0 ? (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Comment</TableHeader>
                <TableHeader>Rating</TableHeader>
                <TableHeader>Destination ID</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {reviews.sort((a, b) => a.id - b.id).map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.destinationId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteReview(review.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No reviews available.</p>
        )}
      </TableContainer>

      <TableContainer>
        <SectionTitle>Bookings</SectionTitle>
        {bookings.length > 0 ? (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Arrival Date</TableHeader>
                <TableHeader>Booking Date</TableHeader>
                <TableHeader>Departure Date</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Destination ID</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {bookings.sort((a, b) => a.id - b.id).map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{formatDate(booking.arrivalDate)}</TableCell>
                  <TableCell>{formatDate(booking.bookingDate, true)}</TableCell>
                  <TableCell>{formatDate(booking.departureDate)}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>{booking.destinationId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteBooking(booking.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No bookings available.</p>
        )}
      </TableContainer>

      <Footer />
    </Box>
  );
};

export default TravelAdministration;
