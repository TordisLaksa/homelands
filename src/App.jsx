import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/App/Router/AppRouter';
import { Header } from "./components/Partials/Header/Header";
import { Footer } from "./components/Partials/Footer/Footer";
import './App.scss'
import { SearchContainer } from './components/pages/Search/SearchData';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <SearchContainer>
          <Header />
          <AppRouter></AppRouter>
          <Footer />
        </SearchContainer>
      </BrowserRouter>
    </>
  );
}