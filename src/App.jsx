import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import VisionPage from './pages/VisionPage';
import EndpointsPage from './pages/EndpointsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalStyle from './styles/GlobalStyle';
import Login from './pages/Login';
import TravelAdministration from './pages/TravelAdministration';

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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
