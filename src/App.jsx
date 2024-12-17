import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import MainPage from './pages/Main';
import VisionPage from './pages/Vision';
import ReviewPage from './pages/Review';
import Login from './components/LogIn';
import TravelAdministration from './pages/TravelAdministration';
import CountryInfoPage from './pages/CountryInfo';
import DestinationsOverView from './pages/DestinationsOverView';
import BookingRegister from './pages/BookingRegister';
import OrderConfirmation from './pages/OrderConfirmation';
import apiFacade from './util/apiFacade';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('loggedIn') === 'true';
    const savedUsername = localStorage.getItem('username') || '';

    if (savedLoginStatus && savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = (username, password) => {
    apiFacade.login(username, password).then(() => {
      setLoggedIn(true);
      setUsername(username);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/'); 
    }).catch(() => {
      alert('Login failed');
    });
  };

  const registerUser = (username, password) => {
    return apiFacade.register(username, password); 
  };

  const logout = () => {
    apiFacade.logout();
    setLoggedIn(false);
    setUsername('');
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <>
      <GlobalStyle />
      <Header loggedIn={loggedIn} username={username} logout={logout} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/admin" element={<TravelAdministration />} />
        <Route path="/country-info" element={<CountryInfoPage />} />
        <Route path="/destinations" element={<DestinationsOverView loggedIn={loggedIn} />} />
        <Route path="/booking" element={<BookingRegister registerUser={registerUser} />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        
      </Routes>
    </>
  );
};

export default App;
