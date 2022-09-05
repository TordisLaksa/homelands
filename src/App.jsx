import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/App/Router/AppRouter';
import { Header } from "./components/Partials/Header/Header";
import { Footer } from "./components/Partials/Footer/Footer";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter></AppRouter>
        <Footer />
      </BrowserRouter>
    </>
  );
}