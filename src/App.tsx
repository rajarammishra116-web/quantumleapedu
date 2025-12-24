import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StudyMaterials from './components/StudyMaterials';
import Simulations from './components/Simulations';
import AdminConsole from './components/AdminConsole';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'materials':
        return <StudyMaterials />;
      case 'simulations':
        return <Simulations />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
      <AdminConsole />
    </div>
  );
}

export default App;
