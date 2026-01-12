import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import NavbarNew from './components/NavbarNew';
import QuoteModal from './components/QuoteModal';

// Páginas
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import PackageInfoPage from './pages/PackageInfoPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import CancellationPage from './pages/CancellationPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';

// --- App Principal ---
const App = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [initialInterest, setInitialInterest] = useState("");

  const handleOpenQuote = (interest = "") => {
    setInitialInterest(interest);
    setIsQuoteOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen font-sans text-grafito bg-white">
        {/* Navbar global */}
        <NavbarNew onOpenQuote={() => handleOpenQuote()} />

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/experiencia/:slug"
            element={<ExperiencePage onOpenQuote={handleOpenQuote} />}
          />
          <Route
            path="/paquete/:slug"
            element={<PackageInfoPage onOpenQuote={handleOpenQuote} />}
          />
          <Route
            path="/about"
            element={<AboutUsPage onOpenQuote={() => handleOpenQuote()} />}
          />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/cancelaciones" element={<CancellationPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
        </Routes>

        {/* Modal de Cotización */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          initialInterest={initialInterest}
        />
      </div>
    </Router>
  );
};

export default App;
