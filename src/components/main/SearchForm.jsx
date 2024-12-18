import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  gap: 15px;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 48%;
  background-color: #f9f9f9;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2a3d4f;
    box-shadow: 0 0 5px rgba(42, 61, 79, 0.3);
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 48%;
  background-color: #f9f9f9;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2a3d4f;
    box-shadow: 0 0 5px rgba(42, 61, 79, 0.3);
  }
`;

const Button = styled.button`
  background-color: #154985;
  color: #fff;
  font-size: 1.1rem;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e2d3a;
  }

  &:active {
    background-color: #162234;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default function SearchFormm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      departure: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      tripType: 'round-trip',
    });

    useEffect(() => {
        // Set today's date in the format YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today);
    
        const fetchDestinations = async () => {
          try {
            const response = await fetch('https://travel.schoolcode.dk/travel/destinations');
            if (response.ok) {
              const data = await response.json();
              setDestinations(data);
            } else {
              console.error('Failed to fetch destinations:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error fetching destinations:', error);
          }
        };
    
        fetchDestinations();
    }, []);

      
    const [destinations, setDestinations] = useState([]);
    const [todayDate, setTodayDate] = useState(''); // To store today's date for minDate

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/destinations", { state: formData }); // Send formData to Destinations page
    };

    // Check if all required fields are filled out
    const isFormValid = formData.departure && formData.destination && formData.departureDate && (formData.tripType === 'one-way' || formData.returnDate); // Return date is optional for one-way trips

  return (
    <>
        <SearchForm onSubmit={handleSearch}>
            <InputGroup>
            <Select
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
            >
                <option value="">Vælg afgangssted</option>
                {destinations.map((destination) => (
                <option key={destination.id} value={`${destination.city}, ${destination.country}`}>
                    {destination.city}, {destination.country}
                </option>
                ))}
            </Select>
            <Select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
            >
                <option value="">Vælg destination</option>
                {destinations
                .filter((destination) => destination.city !== formData.departure.split(',')[0]) // Filter out the selected departure city
                .map((destination) => (
                    <option key={destination.id} value={`${destination.city}, ${destination.country}`}>
                    {destination.city}, {destination.country}
                    </option>
                ))}
            </Select>
            </InputGroup>
            <InputGroup>
            <Input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                min={todayDate} // Ensure departure date cannot be in the past
            />
            <Input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                min={formData.departureDate || todayDate} // Ensure return date is not before departure date or today's date
                disabled={formData.tripType !== 'round-trip'}
            />
            </InputGroup>
            <Select
                name="tripType"
                value={formData.tripType}
                onChange={handleInputChange}
            >
            <option value="round-trip">Tur/retur</option>
            </Select>
            <Button type="submit" disabled={!isFormValid}>Søg</Button>
        </SearchForm>
    </>
  )
}
