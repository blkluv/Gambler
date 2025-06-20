import React, { useState, useRef } from 'react';
import { Code, Users, TrendingUp, Twitter, MessageSquare, Star, DollarSign, BarChart3, Copy, Rocket, Gamepad2, Coins, Zap, Timer, Bomb, Heart, Gift, Play as PlayCard } from 'lucide-react';
import { Button } from '../../UI/Button';
import Card from '../../UI/Card';
import DeveloperGameCard from './DeveloperGameCard';
import SupportModal from './SupportModal';
import DeveloperProfile from './DeveloperProfile';
import MobileDeveloperModal from './MobileDeveloperModal';

const DeFiGamesShowcase: React.FC = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [hoveredDeveloper, setHoveredDeveloper] = useState<{
    developer: { name: string; avatar: string; revenue: string };
    position: { x: number; y: number };
  } | null>(null);
  const [selectedMobileDeveloper, setSelectedMobileDeveloper] = useState<{
    name: string; 
    avatar: string; 
    revenue: string;
  } | null>(null);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const developerGames = [
    {
      title: 'Roulette',
      description: 'Classic casino roulette with up to 35x multiplier! Place your bets!',
      icon: <Timer className="text-primary w-8 h-8" />,
      image: '/images/roulette_transparent.png',
      path: '/roulette',
      developer: {
        name: 'CryptoWizard.sol',
        avatar: '/images/gigachad.png',
        handle: '@cryptowizard'
      },
      metrics: {
        totalPlayers: 2400000,
        totalWagered: 45600000,
        developerEarnings: 456000,
        monthlyGrowth: 34,
        launchDate: 'Jan 2024',
        activeCasinos: 127
      },
      socialLinks: {
        twitter: 'https://twitter.com/cryptowizard',
        discord: 'https://discord.gg/cryptowizard'
      },
      rating: 4.9,
      monthlyRevenue: 89000
    },
    {
      title: 'Crash',
      description: 'Watch the rocket soar and cash out before it crashes! Up to 100x multiplier.',
      icon: <Rocket className="text-secondary w-8 h-8" />,
      image: '/images/ccrash.png',
      path: '/crash',
      developer: {
        name: 'DegenBuilder',
        avatar: '/images/pepe.png',
        handle: '@degenbuilder'
      },
      metrics: {
        totalPlayers: 1800000,
        totalWagered: 32400000,
        developerEarnings: 324000,
        monthlyGrowth: 28,
        launchDate: 'Feb 2024',
        activeCasinos: 98
      },
      socialLinks: {
        twitter: 'https://twitter.com/degenbuilder',
        discord: 'https://discord.gg/degenbuilder'
      },
      rating: 4.7,
      monthlyRevenue: 67000
    },
    {
      title: 'Mines',
      description: 'Navigate through the minefield. The deeper you go, the higher the rewards!',
      icon: <Bomb className="text-accent-magenta w-8 h-8" />,
      image: '/images/mines_transparent.png',
      path: '/mines',
      developer: {
        name: 'DiamondHands',
        avatar: '/images/chad.png',
        handle: '@diamondhands'
      },
      metrics: {
        totalPlayers: 1500000,
        totalWagered: 28900000,
        developerEarnings: 289000,
        monthlyGrowth: 42,
        launchDate: 'Mar 2024',
        activeCasinos: 85
      },
      socialLinks: {
        twitter: 'https://twitter.com/diamondhands',
        discord: 'https://discord.gg/diamondhands'
      },
      rating: 4.8,
      monthlyRevenue: 58000
    },
    {
      title: 'Coin Flip',
      description: 'FLIP OR RUG! Double your SOL or get NGMI\'d! Choose wisely fam! 🎲',
      icon: <Coins className="text-primary w-8 h-8" />,
      image: '/images/solanacoin.png',
      path: '/coinflip',
      developer: {
        name: 'FlipMaster',
        avatar: '/images/doge.png',
        handle: '@flipmaster'
      },
      metrics: {
        totalPlayers: 3200000,
        totalWagered: 67800000,
        developerEarnings: 678000,
        monthlyGrowth: 19,
        launchDate: 'Dec 2023',
        activeCasinos: 156
      },
      socialLinks: {
        twitter: 'https://twitter.com/flipmaster',
        discord: 'https://discord.gg/flipmaster'
      },
      rating: 4.6,
      monthlyRevenue: 124000
    },
    {
      title: 'Date or NGMI',
      description: 'Choose your date wisely! Some carry hidden risks that will rug your heart! 💔',
      icon: <Heart className="text-accent-magenta w-8 h-8" />,
      image: '/images/pepa.png',
      path: '/date',
      developer: {
        name: 'LoveGuru.eth',
        avatar: '/images/wojak.png',
        handle: '@loveguru'
      },
      metrics: {
        totalPlayers: 890000,
        totalWagered: 23400000,
        developerEarnings: 234000,
        monthlyGrowth: 31,
        launchDate: 'Apr 2024',
        activeCasinos: 67
      },
      socialLinks: {
        twitter: 'https://twitter.com/loveguru',
        discord: 'https://discord.gg/loveguru'
      },
      rating: 4.9,
      monthlyRevenue: 45000
    },
    {
      title: 'Degen UNO',
      description: 'Play UNO against other degens! Winner takes the pot! 🃏',
      icon: <PlayCard className="text-primary w-8 h-8" />,
      image: '/images/chad.png',
      path: '/uno',
      developer: {
        name: 'CardShark',
        avatar: '/images/gigachad.png',
        handle: '@cardshark'
      },
      metrics: {
        totalPlayers: 1200000,
        totalWagered: 19800000,
        developerEarnings: 198000,
        monthlyGrowth: 37,
        launchDate: 'May 2024',
        activeCasinos: 73
      },
      socialLinks: {
        twitter: 'https://twitter.com/cardshark',
        discord: 'https://discord.gg/cardshark'
      },
      rating: 4.7,
      monthlyRevenue: 39000
    },
    {
      title: '$1M Raffle',
      description: 'Join our MEGA raffle! One lucky degen takes home $1,000,000! 🚀',
      icon: <Gift className="text-secondary w-8 h-8" />,
      image: '/images/ticket.png',
      path: '/raffle',
      developer: {
        name: 'RaffleLord',
        avatar: '/images/laser-eyes.png',
        handle: '@rafflelord'
      },
      metrics: {
        totalPlayers: 2100000,
        totalWagered: 41200000,
        developerEarnings: 412000,
        monthlyGrowth: 25,
        launchDate: 'Jan 2024',
        activeCasinos: 112
      },
      socialLinks: {
        twitter: 'https://twitter.com/rafflelord',
        discord: 'https://discord.gg/rafflelord'
      },
      rating: 4.5,
      monthlyRevenue: 78000
    },
    {
      title: 'Coming Soon: Dice',
      description: 'Roll the dice and test your luck with custom win chances.',
      icon: <Gamepad2 className="text-secondary w-8 h-8" />,
      image: '/images/doge.png',
      path: '#',
      isComingSoon: true,
      developer: {
        name: 'DiceDevs',
        avatar: '/images/doge.png',
        handle: '@dicedevs'
      },
      metrics: {
        totalPlayers: 0,
        totalWagered: 0,
        developerEarnings: 0,
        monthlyGrowth: 0,
        launchDate: 'Coming Soon',
        activeCasinos: 0
      },
      socialLinks: {
        twitter: 'https://twitter.com/dicedevs',
        discord: 'https://discord.gg/dicedevs'
      },
      rating: 0,
      monthlyRevenue: 0
    },
    {
      title: 'Create Your Game',
      description: 'Build the next viral gambling game and earn 1% forever!',
      icon: <Code className="text-accent-magenta w-8 h-8" />,
      image: '/images/gmi.png',
      isCreateNew: true
    }
  ];

  const topDevelopers = [
    { name: 'FlipMaster', avatar: '/images/doge.png', revenue: '$124K' },
    { name: 'CryptoWizard.sol', avatar: '/images/gigachad.png', revenue: '$89K' },
    { name: 'RaffleLord', avatar: '/images/laser-eyes.png', revenue: '$78K' },
    { name: 'DegenBuilder', avatar: '/images/pepe.png', revenue: '$67K' },
    { name: 'DiamondHands', avatar: '/images/chad.png', revenue: '$58K' },
    { name: 'LoveGuru.eth', avatar: '/images/wojak.png', revenue: '$45K' }
  ];

  const gameTemplates = [
    { name: 'Roulette', icon: '/images/roulette_transparent.png' },
    { name: 'Crash', icon: '/images/ccrash.png' },
    { name: 'Mines', icon: '/images/mines_transparent.png' },
    { name: 'Coin Flip', icon: '/images/solanacoin.png' },
    { name: 'Date Game', icon: '/images/pepa.png' },
    { name: 'UNO', icon: '/images/chad.png' },
    { name: 'Raffle', icon: '/images/ticket.png' },
    { name: 'Dice', icon: '/images/doge.png' }
  ];

  // Check if device is mobile
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  const handleDeveloperInteraction = (developer: { name: string; avatar: string; revenue: string }, event: React.MouseEvent) => {
    if (isMobile()) {
      // On mobile, open full-screen modal
      setSelectedMobileDeveloper(developer);
    } else {
      // On desktop, show hover profile
      handleDeveloperHover(developer, event);
    }
  };

  const handleDeveloperHover = (developer: { name: string; avatar: string; revenue: string }, event: React.MouseEvent) => {
    // Clear any existing timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
      profileTimeoutRef.current = null;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredDeveloper({
      developer,
      position: {
        x: rect.right - 10, // Overlap slightly to prevent gap
        y: rect.top
      }
    });
  };

  const handleDeveloperLeave = () => {
    // Only start timeout if we're not already hovering over the profile
    if (!profileTimeoutRef.current) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredDeveloper(null);
      }, 300); // Increased delay
    }
  };

  const handleProfileHover = () => {
    // Clear any pending hide timeouts when hovering over profile
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
      profileTimeoutRef.current = null;
    }
  };

  const handleProfileLeave = () => {
    // Add a small delay before hiding when leaving profile
    profileTimeoutRef.current = setTimeout(() => {
      setHoveredDeveloper(null);
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl sm:text-5xl font-title bg-gradient-primary bg-clip-text text-transparent">
            🎮 DEFI GAMES (Developer Showcase)
          </h1>
          <div className="px-3 py-1 rounded-full bg-gradient-secondary border border-accent-magenta/30">
            <span className="text-text-primary text-sm font-medium flex items-center gap-2">
              Live 
              <div className="live-indicator" />
            </span>
          </div>
        </div>
        
        <p className="text-xl text-text-secondary mb-8">
          List your own on-chain game via smart contract. Earn 1% of every wager, across every casino. No licensing fees. Instant deployment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            variant="premium" 
            size="lg" 
            className="min-w-[200px]"
            onClick={() => setShowSupportModal(true)}
          >
            <Code size={20} className="mr-2" />
            Create New Game
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[200px]"
            onClick={() => {
              const element = document.getElementById('developer-listings');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <BarChart3 size={20} className="mr-2" />
            Browse Developer Listings
          </Button>
        </div>

        {/* Top Developers Carousel - Fixed width containers with hover profiles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Star className="text-primary" size={24} />
            Top Developers This Month
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {topDevelopers.map((dev, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-32 flex flex-col items-center gap-3 p-4 rounded-xl bg-background-card border border-border hover:border-primary/30 transition-colors cursor-pointer relative"
                onClick={(e) => handleDeveloperInteraction(dev, e)}
                onMouseEnter={(e) => !isMobile() && handleDeveloperHover(dev, e)}
                onMouseLeave={() => !isMobile() && handleDeveloperLeave()}
              >
                <div className="relative">
                  <img src={dev.avatar} alt={dev.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-primary text-xs font-bold">
                    #{index + 1}
                  </div>
                </div>
                <div className="text-center w-full">
                  <div className="font-bold text-text-primary text-sm truncate" title={dev.name}>{dev.name}</div>
                  <div className="text-secondary text-xs">{dev.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div id="developer-listings" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {developerGames.map((game, index) => (
              <DeveloperGameCard 
                key={index} 
                {...game} 
                onOpenSupportModal={() => setShowSupportModal(true)}
              />
            ))}
          </div>
        </div>

        {/* Create New Game Wizard Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Code className="text-accent-magenta" size={24} />
            Create New Game - 4 Step Process
          </h2>
          <Card variant="premium" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold text-text-primary mb-2">Choose Template</h3>
                <p className="text-text-tertiary text-sm">Select from proven game mechanics</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="font-bold text-text-primary mb-2">Set Parameters</h3>
                <p className="text-text-tertiary text-sm">Customize odds, limits, and features</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-magenta/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-magenta">3</span>
                </div>
                <h3 className="font-bold text-text-primary mb-2">Deploy Contract</h3>
                <p className="text-text-tertiary text-sm">Instant smart contract deployment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-bold text-text-primary mb-2">Publish & Earn</h3>
                <p className="text-text-tertiary text-sm">Go live across all casinos</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 rounded-xl bg-background border border-border">
              <h4 className="font-bold text-text-primary mb-4">Step 1: Choose Template</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {gameTemplates.map((template, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                    <img src={template.icon} alt={template.name} className="w-12 h-12 object-contain" />
                    <span className="text-xs text-text-secondary text-center">{template.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="cosmic" className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Copy className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Fork a Game</h3>
              <p className="text-text-secondary">
                Clone any existing game template or build from scratch. Our SDK handles all the complex smart contract logic.
              </p>
            </Card>

            <Card variant="cosmic" className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Earn 1% Forever</h3>
              <p className="text-text-secondary">
                Receive 1% of every bet placed on your game across ALL casinos in the network. Passive income that scales globally.
              </p>
            </Card>

            <Card variant="cosmic" className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-accent-magenta/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-accent-magenta" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Scale Globally</h3>
              <p className="text-text-secondary">
                Your game automatically appears in every casino that joins our network. No marketing needed - just build and earn.
              </p>
            </Card>
          </div>
        </div>

        {/* Clone Your Casino Callout */}
        <Card variant="premium" className="p-8 text-center bg-gradient-card">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Launch Your Own Casino?</h2>
          <p className="text-xl text-text-secondary mb-8">
            Fork our entire platform and create your own gambling empire. Access to all games, instant deployment, zero licensing fees.
          </p>
          <Button 
            variant="premium" 
            size="lg" 
            className="min-w-[250px]"
            onClick={() => setShowSupportModal(true)}
          >
            <Rocket size={20} className="mr-2" />
            Launch Your Casino
          </Button>
        </Card>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <SupportModal onClose={() => setShowSupportModal(false)} />
      )}

      {/* Desktop Developer Profile Hover */}
      {hoveredDeveloper && !isMobile() && (
        <DeveloperProfile
          developer={hoveredDeveloper.developer}
          position={hoveredDeveloper.position}
          onClose={() => setHoveredDeveloper(null)}
          onHover={handleProfileHover}
          onLeave={handleProfileLeave}
        />
      )}

      {/* Mobile Developer Modal */}
      {selectedMobileDeveloper && (
        <MobileDeveloperModal
          developer={selectedMobileDeveloper}
          onClose={() => setSelectedMobileDeveloper(null)}
        />
      )}
    </div>
  );
};

export default DeFiGamesShowcase;