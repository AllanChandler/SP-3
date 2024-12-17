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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const UnauthorizedMessage = styled.div`
  text-align: center;
  color: red;
`;

const ReviewPage = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: '',
    rating: 0,
    destinationId: null,
  });
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!facade.loggedIn()) {
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

    fetchDestinations();
    fetchReviews();
  }, []);

  const handleAddReview = async () => {
    
    if (!newReview.comment || !/[a-zA-Z]/.test(newReview.comment)) {
      setErrorMessage('Comment is required and must contain at least one letter.');
      return;
    }
    if (newReview.rating < 1 || newReview.rating > 5) {
      setErrorMessage('Rating must be between 1 and 5.');
      return;
    }
    setErrorMessage(''); 

    try {
      const addedReview = await facade.addReview(newReview);
      setReviews([...reviews, addedReview]);
      setNewReview({ comment: '', rating: 0, destinationId: null });
      setIsAddingReview(false);  
      alert('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('An error occurred while adding the review.');
    }
  };

  // Function to handle selecting a destination and displaying the review form
  const handleAddReviewClick = (destinationId) => {
    setNewReview({ ...newReview, destinationId });
    setIsAddingReview(true);
  };

  if (unauthorized) {
    return (
      <UnauthorizedMessage>
        <h2>Unauthorized</h2>
        <p>You do not have the necessary permissions to access this page.</p>
      </UnauthorizedMessage>
    );
  }

  // Find selected destination details based on the destinationId
  const selectedDestination = destinations.find(
    (destination) => destination.id === newReview.destinationId
  );

  return (
    <Box>
      <Title>Reviews</Title>
      <Text>Her kan du tilføje nye anmeldelser og se anmeldelser fra andre.</Text>

      <div>
        <SectionTitle>Destinations</SectionTitle>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>City</TableHeader>
              <TableHeader>Country</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell>{destination.city}</TableCell>
                <TableCell>{destination.country}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAddReviewClick(destination.id)}>
                    Add Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        {isAddingReview && (
          <div>
            <Text>Add Review for {selectedDestination ? `${selectedDestination.city}, ${selectedDestination.country}` : 'Selected Destination'}</Text>
            <FormContainer>
              <Input
                type="text"
                placeholder="Comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Rating (1-5)"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                }
                min="1"
                max="5"
              />
              <AddButton onClick={handleAddReview}>Add Review</AddButton>
            </FormContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        )}
      </div>

      <TableContainer>
        <SectionTitle>Reviews</SectionTitle>
        {reviews.length > 0 ? (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Comment</TableHeader>
                <TableHeader>Rating</TableHeader>
                <TableHeader>Destination</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {reviews.map((review) => {
                const destination = destinations.find(
                  (dest) => dest.id === review.destinationId
                );
                return (
                  <TableRow key={review.id}>
                    <TableCell>{review.comment}</TableCell>
                    <TableCell>{review.rating}</TableCell>
                    <TableCell>{destination ? destination.city : 'Unknown'}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No reviews available.</p>
        )}
      </TableContainer>

      <Footer />
    </Box>
  );
};

export default ReviewPage;
