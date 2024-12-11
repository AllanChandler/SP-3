import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import VisionPage from './pages/VisionPage';
import EndpointsPage from './pages/EndpointsPage';
import Login from './pages/Login';
import TravelAdministration from './pages/TravelAdministration';
import CountryInfoPage from './pages/CountryInfoPage'; 
import BookingRegister from './pages/BookingRegister'; 
import OrderConfirmation from './pages/OrderConfirmation';
import Register from './pages/Register'; 


const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/admin" element={<TravelAdministration />} />
        <Route path="/country-info" element={<CountryInfoPage />} /> 
        <Route path="/booking" element={<BookingRegister />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />

        

      </Routes>
    </Router>
  );
};

export default App;
