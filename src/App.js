import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutMe from './components/AboutMe';
import Technologies from './components/Technologies';
import ProjectList from './components/ProjectList';
import ContactForm from './components/ContactForm';



function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowFooter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="bg-background min-h-screen">
        <header className="p-4 bg-black shadow-md">
          <h1 className="text-3xl font-bold text-primary text-center">
            João Carlos's Portfolio
          </h1>
          <nav className="mt-4 text-center">
            <Link to="/" className="text-white mx-4">Home</Link>
            <Link to="/contact" className="text-white mx-4">Contact</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
        </main>

        {showFooter && (
          <footer className="p-4 bg-black text-center">
            <p className="text-gray-500">&copy; 2025 João Carlos - All Rights Reserved</p>
          </footer>
        )}
      </div>
    </Router>
  );
}

// Home component (contains AboutMe, Technologies, and ProjectList)
function Home() {
  return (
    <div>
      <AboutMe />
      <Technologies />
      <ProjectList />
    </div>
  );
}

export default App;
