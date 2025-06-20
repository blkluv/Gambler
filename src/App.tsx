import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Home/HomePage';
import GamesShowcase from './components/Games/GamesShowcase';
import DeFiGamesShowcase from './components/Games/DeFiGames/DeFiGamesShowcase';
import RouletteGame from './components/Games/Roulette/RouletteGame';
import CrashGame from './components/Games/Crash/CrashGame';
import MinesGame from './components/Games/Mines/MinesGame';
import RaffleGame from './components/Games/Raffle/RaffleGame';
import CoinFlipGame from './components/Games/CoinFlip/CoinFlipGame';
import DateGame from './components/Games/DateGame/DateGame';
import UnoGame from './components/Games/Uno/UnoGame';
import StakingDashboard from './components/Dashboard/StakingDashboard';
import WelcomeModal from './components/UI/WelcomeModal';

// Game images to preload
const gameImages = [
  'https://i.ibb.co/1G1dmF5x/roulette.png',
  'https://images.pexels.com/photos/23769/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://i.ibb.co/R470gzz1/raw-se-2025-04-23-T07-02-58-Z-sp-r-sv-2024-08-04-sr-b-scid-0d1f3c1a-a81b-5cc4-b9ae-8decb13a8793-skoi.png',
  'https://images.pexels.com/photos/5738123/pexels-photo-5738123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Preload game images
    gameImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Show modal after a short delay for better UX
    const timer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesShowcase />} />
            <Route path="/defi-games" element={<DeFiGamesShowcase />} />
            <Route path="/roulette" element={<RouletteGame />} />
            <Route path="/crash" element={<CrashGame />} />
            <Route path="/mines" element={<MinesGame />} />
            <Route path="/raffle" element={<RaffleGame />} />
            <Route path="/coinflip" element={<CoinFlipGame />} />
            <Route path="/date" element={<DateGame />} />
            <Route path="/uno" element={<UnoGame />} />
            <Route path="/staking" element={<StakingDashboard />} />
          </Routes>
        </main>
        <Footer />
        {showWelcomeModal && (
          <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;