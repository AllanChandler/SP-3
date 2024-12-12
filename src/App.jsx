import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import VisionPage from './pages/VisionPage';
import EndpointsPage from './pages/EndpointsPage';
import Login from './pages/Login';
import TravelAdministration from './pages/TravelAdministration';
import CountryInfoPage from './pages/CountryInfoPage'; 
import DestinationsOverView from './pages/DestinationsOverView';
import BookingRegister from './pages/BookingRegister'; 
import OrderConfirmation from './pages/OrderConfirmation';
import Review from './pages/Review';

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
        <Route path="/admin" element={<TravelAdministration />} />
        <Route path="/country-info" element={<CountryInfoPage />} /> 
        <Route path='/destinations' element={<DestinationsOverView/>} />
        <Route path="/booking" element={<BookingRegister />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/review" element={<Review />} />



        

      </Routes>
    </Router>
  );
};

export default App;
