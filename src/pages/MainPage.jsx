import React, { useState } from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f4f4f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2a3d4f;
  margin-bottom: 10px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 48%;
`;

const Button = styled.button`
  background-color: #2a3d4f;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e2d3a;
  }
`;

const MainPage = () => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    tripType: 'round-trip',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // API-kald logik for at hente rejser baseret på formData
    console.log('Søgeparametre:', formData);
  };

  return (
    <MainWrapper>
      <Title>Velkommen til JourneyHub</Title>
      <SearchForm onSubmit={handleSearch}>
        <InputGroup>
          <Select
            name="departure"
            value={formData.departure}
            onChange={handleInputChange}
          >
            <option value="">Vælg afgangssted</option>
            <option value="Copenhagen, Denmark">København, Danmark</option>
            <option value="Tangier, Morocco">Tangier, Marokko</option>
            <option value="Paris, France">Paris, Frankrig</option>
            <option value="Berlin, Germany">Berlin, Tyskland</option>
            <option value="New York, USA">New York, USA</option>
          </Select>
          <Select
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
          >
            <option value="">Vælg destination</option>
            <option value="Copenhagen, Denmark">København, Danmark</option>
            <option value="Tangier, Morocco">Tangier, Marokko</option>
            <option value="Paris, France">Paris, Frankrig</option>
            <option value="Berlin, Germany">Berlin, Tyskland</option>
            <option value="New York, USA">New York, USA</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleInputChange}
            disabled={formData.tripType !== 'round-trip'}
          />
        </InputGroup>
        <Select
          name="tripType"
          value={formData.tripType}
          onChange={handleInputChange}
        >
          <option value="round-trip">Tur/retur</option>
          <option value="one-way">Enkeltvej</option>
        </Select>
        <Button type="submit">Søg</Button>
      </SearchForm>
    </MainWrapper>
  );
};

export default MainPage;
