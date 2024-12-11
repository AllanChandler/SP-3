// OrderConfirmation.js
import styled from 'styled-components';
import Footer from '../components/Footer';  // Sørg for at importere din Footer-komponent korrekt

const ConfirmationWrapper = styled.div`
  padding: 40px;
  background-color: #f0f4f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  // Sørger for at indholdet fylder hele skærmen
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2a3d4f;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #2a3d4f;
  color: #fff;
  font-size: 1.1rem;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #1e2d3a;
  }

  &:active {
    background-color: #162234;
  }
`;

const OrderConfirmation = () => {
  return (
    <ConfirmationWrapper>
      <div>
        <Title>Tak for din bestilling!</Title>
        <Message>
          Din bestilling er blevet modtaget. Vi sender dig en bekræftelse på e-mail.
        </Message>
        <Button onClick={() => window.location.href = "/"}>Tilbage til forsiden</Button>
      </div>
      
      <Footer isSticky={true} />
    </ConfirmationWrapper>
  );
};

export default OrderConfirmation;

