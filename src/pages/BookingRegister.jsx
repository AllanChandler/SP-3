import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import facade from '../util/apiFacade';

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  flex-grow: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FlexGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #154985;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background-color: #aaa;
  }
`;

const BookingRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFlightData } = location.state || {}; // Get flight data

  console.log(selectedFlightData);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    nationality: '',
    email: '',
    password1: '',
    password2: '',
    cardnumber: '',
    expiration: '',
    cvv: '',
    cardname: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    // Validate the form
    if (!selectedFlightData) {
      alert('No flight data available!');
      setIsSubmitting(false);
      return;
    }

    if (formData.password1 !== formData.password2) {
      alert('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    // Registration data
    const registrationData = {
      username: formData.email,
      password: formData.password1,
    };

    // Function to format date as YYYY-MM-DD
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
    };

    // Function to format date as YYYY-MM-DDTHH:mm:ss
    const formatDateWithTime = (date) => {
      const d = new Date(date);
      return d.toISOString().split('.')[0]; // Get the full ISO string without milliseconds
    };

    // Split the "destinationCity" into city and country
    const [city] = selectedFlightData.arrivalCity.split(',').map(str => str.trim());

    // Booking data
    const bookingData = {
      destinationCity: city,  // Send only the city to the API
      departureDate: formatDateWithTime(selectedFlightData.departureDate),  
      arrivalDate: formatDateWithTime(selectedFlightData.returnDate),
      bookingDate: formatDate(new Date()),
      status: 'PENDING'  // Add status as 'PENDING'
    };

    try {
      // Register the user
      await facade.register(registrationData.username, registrationData.password);

      // Submit the booking
      const bookingResponse = await fetch('https://travel.schoolcode.dk/travel/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!bookingResponse.ok) {
        throw new Error(`Booking failed: Please check the informations and try again`);
      }

      console.log('Booking successful.');
      alert('Registration and booking completed successfully!');
      navigate("/confirmation", { state: { selectedFlightData } });
    } catch (error) {
      console.error('Error:', error);
      if (error.status === 400) {
        alert('The email you provided is already registered. Please log in or use a different email.');
      } else {
        alert(`Booking failed: Please check the informations and try again`);
      }
    }

    setIsSubmitting(false);
    
  };

  // Check if all required fields are filled out and passwords match
  const isFormValid =
    formData.firstname &&
    formData.lastname &&
    formData.phonenumber &&
    formData.nationality &&
    formData.email &&
    formData.password1 &&
    formData.password2 &&
    formData.password1 === formData.password2 &&
    formData.cardnumber &&
    formData.expiration &&
    formData.cvv &&
    formData.cardname;

  return (
    <PageWrapper>
      <Container>
        <Form method="post" onSubmit={handleSubmit}>
          <h2>Personlige oplysninger</h2>
          <FlexGroup>
            <Input
              type="text"
              name="firstname"
              placeholder="Fornavn"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="lastname"
              placeholder="Efternavn"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </FlexGroup>
          <FlexGroup>
            <Input
              type="text"
              name="phonenumber"
              placeholder="Telefonnummer"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="nationality"
              placeholder="Nationalitet"
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </FlexGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FlexGroup>
            <Input
              type="password"
              name="password1"
              placeholder="Kodeord"
              value={formData.password1}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="password2"
              placeholder="Gentag kodeord"
              value={formData.password2}
              onChange={handleInputChange}
            />
          </FlexGroup>
          <h2>Bankoplysninger</h2>
          <Input
            type="number"
            name="cardnumber"
            placeholder="Kortnummer"
            value={formData.cardnumber}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="expiration"
            placeholder="Udløbsdato (MM/ÅÅ)"
            value={formData.expiration}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="cardname"
            placeholder="Kortholders navn"
            value={formData.cardname}
            onChange={handleInputChange}
          />
          <SubmitButton type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </Form>
      </Container>
      <Footer isSticky={false} />
    </PageWrapper>
  );
};

export default BookingRegister;
