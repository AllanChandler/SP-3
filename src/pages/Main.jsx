import styled from 'styled-components';
import Footer from '../components/Footer';
import SearchFormm from '../components/main/SearchForm';

const Subtitle = styled.h2`
  font-size: 1.6rem;
  color: #154985;
  margin-bottom: 40px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
`;

const MainPage = () => {

  return (
    <>
      <Subtitle>De bedste rejseoplevelser – fra hvor som helst, til hvor som helst</Subtitle>
      <SearchFormm />
      <Footer isSticky={true} />
    </>
  );
};

export default MainPage;






