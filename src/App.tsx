import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Content from './pages/Content';
import CorperOfTheWeek from './pages/CorperOfTheWeek';
import Advertise from './pages/Advertise';
import Community from './pages/Community';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'content':
        return <Content />;
      case 'corper-of-the-week':
        return <CorperOfTheWeek />;
      case 'advertise':
        return <Advertise />;
      case 'community':
        return <Community />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
