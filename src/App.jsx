import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import VisionPage from './pages/VisionPage';
import EndpointsPage from './pages/EndpointsPage';
import CountryInfoPage from './pages/CountryInfoPage'; 

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
        <Route path="/country-info" element={<CountryInfoPage />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
