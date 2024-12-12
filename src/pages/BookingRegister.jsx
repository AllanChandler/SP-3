import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

// Styling with styled-components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the page takes the full height of the screen */
`;

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  flex-grow: 1; /* Allow this container to grow and fill available space */
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

  &:focus {
    outline: none;
    border-color: #154985;
    box-shadow: 0 0 4px rgba(21, 73, 133, 0.3);
  }
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

  &:hover {
    background-color: #123a6d;
  }
`;

const BookingRegister = () => {
  // State to manage form data
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now handle the form data, e.g., send it to an API or handle it locally
    console.log(formData);
    alert("Form Submitted");
  };

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
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Container>
      <Footer isSticky={false} />
    </PageWrapper>
  );
};

export default BookingRegister;