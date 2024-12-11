import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiFacade from "./util/apiFacade";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from './styles/GlobalStyle'; // Import global styles if any
import MainPage from './pages/MainPage'; // Import your pages
import VisionPage from './pages/VisionPage';
import EndpointsPage from './pages/EndpointsPage';
import Login from './pages/Login';
import TravelAdministration from './pages/TravelAdministration';
import CountryInfoPage from './pages/CountryInfoPage';
import BookingRegister from './pages/BookingRegister';
import OrderConfirmation from './pages/OrderConfirmation';
import Register from './components/Register'; // Import Register component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Check login status when app mounts (localStorage-based login persistence)
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("loggedIn") === "true";
    const savedUsername = localStorage.getItem("username") || "";

    if (savedLoginStatus && savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  // Handle login
  const login = (username, password) => {
    apiFacade.login(username, password).then(() => {
      // If login is successful
      setLoggedIn(true);
      setUsername(username);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", username); // Store username in localStorage
      navigate("/"); // Navigate after successful login (without reloading the page)
    }).catch(() => {
      alert("Login failed");
    });
  };

  // Handle logout
  const logout = () => {
    apiFacade.logout(); // Call to logout function
    setLoggedIn(false);
    setUsername("");
    localStorage.clear(); // Clear the storage to log out the user
    navigate("/"); // Navigate to home or login page (without reloading the page)
  };

  return (
    <div>
      <GlobalStyle />
      <Header loggedIn={loggedIn} username={username} login={login} logout={logout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/endpoints" element={<EndpointsPage />} />
          <Route path="/login" element={<Login login={login} />} /> {/* Passing login function */}
          <Route path="/register" element={<Register />} /> {/* Register route */}
          <Route path="/admin" element={<TravelAdministration />} />
          <Route path="/country-info" element={<CountryInfoPage />} />
          <Route path="/booking" element={<BookingRegister />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
