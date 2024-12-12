import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const Wrapper = styled.div`
  padding: 20px;
  background-color: #f4f7fb;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #154985;
  text-align: center;
  margin-bottom: 30px;
`;

const ReviewBox = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

const ReviewItem = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewTitle = styled.h3`
  font-size: 1.6rem;
  color: #154985;
`;

const ReviewBody = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #555;
`;


const ReviewRating = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  color: #ff9800;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #999;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: red;
`;

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from the server when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:7070/travel/reviews');
        
        if (!response.ok) {
          throw new Error('Der opstod en fejl ved hentning af anmeldelser.');
        }

        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Wrapper>
      <Title>Rejseanmeldelser</Title>

      {loading && <LoadingMessage>Indlæser anmeldelser...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && reviews.length === 0 && (
        <p>Ingen anmeldelser tilgængelige.</p>
      )}

      {/* Display reviews */}
      <ReviewBox>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <ReviewTitle>Vurdering {review.rating} - {review.comment}</ReviewTitle>
            <ReviewRating>Rating: {review.rating} / 5</ReviewRating>
            <ReviewBody>{review.comment}</ReviewBody>
          </ReviewItem>
        ))}
      </ReviewBox>
    </Wrapper>
  );
};

export default ReviewPage;


