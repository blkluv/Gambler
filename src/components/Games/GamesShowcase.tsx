import React from 'react';
import { Dices, Rocket, Bomb, Timer, Gift, Coins, Heart, Play as PlayCard } from 'lucide-react';
import GameCard from '../UI/GameCard';

const GamesShowcase: React.FC = () => {
  const games = [
    {
      title: 'Roulette',
      description: 'Classic casino roulette with up to 35x multiplier! Place your bets!',
      icon: <Timer className="text-primary w-8 h-8" />,
      path: '/roulette',
      image: '/images/roulette_transparent.png'
    },
    {
      title: 'Crash',
      description: 'Watch the rocket soar and cash out before it crashes! Up to 100x multiplier.',
      icon: <Rocket className="text-secondary w-8 h-8" />,
      path: '/crash',
      image: '/images/ccrash.png'
    },
    {
      title: 'Mines',
      description: 'Navigate through the minefield. The deeper you go, the higher the rewards!',
      icon: <Bomb className="text-accent-magenta w-8 h-8" />,
      path: '/mines',
      image: '/images/mines_transparent.png'
    },
    {
      title: 'Coin Flip',
      description: 'FLIP OR RUG! Double your SOL or get NGMI\'d! Choose wisely fam! 🎲',
      icon: <Coins className="text-primary w-8 h-8" />,
      path: '/coinflip',
      image: '/images/solanacoin.png',
      isCoin: true
    },
    {
      title: 'Date or NGMI',
      description: 'Choose your date wisely! Some carry hidden risks that will rug your heart! 💔',
      icon: <Heart className="text-accent-magenta w-8 h-8" />,
      path: '/date',
      image: '/images/pepa.png'
    },
    {
      title: 'Degen UNO',
      description: 'Play UNO against other degens! Winner takes the pot! 🃏',
      icon: <PlayCard className="text-primary w-8 h-8" />,
      path: '/uno',
      image: '/images/chad.png'
    },
    {
      title: '$1M Raffle',
      description: 'Join our MEGA raffle! One lucky degen takes home $1,000,000! 🚀',
      icon: <Gift className="text-secondary w-8 h-8" />,
      path: '/raffle',
      image: '/images/ticket.png'
    },
    {
      title: 'Coming Soon: Dice',
      description: 'Roll the dice and test your luck with custom win chances.',
      icon: <Dices className="text-secondary w-8 h-8" />,
      path: '#',
      image: '/images/doge.png',
      isComingSoon: true
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl sm:text-5xl font-title bg-gradient-primary bg-clip-text text-transparent">
            🎮 DEGEN GAMES
          </h1>
          <div className="px-3 py-1 rounded-full bg-gradient-secondary border border-accent-magenta/30">
            <span className="text-text-primary text-sm font-medium flex items-center gap-2">
              Live 
              <div className="live-indicator" />
            </span>
          </div>
        </div>
        
        <p className="text-xl text-text-secondary mb-12">
          Choose your game and start winning! All games feature instant payouts and shared rewards for stakers. 
          WAGMI fam! 🚀
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.title}
              {...game}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesShowcase;