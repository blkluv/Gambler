import React, { useEffect } from 'react';
import { X, Star, DollarSign, BarChart3, Users, TrendingUp, Calendar, Globe, Gamepad2, Trophy, Zap } from 'lucide-react';
import { Button } from '../../UI/Button';
import Card from '../../UI/Card';

interface Game {
  name: string;
  revenue: number;
  players: number;
  wagered: number;
  growth: number;
}

interface MobileDeveloperModalProps {
  developer: {
    name: string;
    avatar: string;
    revenue: string;
  };
  onClose: () => void;
}

const MobileDeveloperModal: React.FC<MobileDeveloperModalProps> = ({ 
  developer, 
  onClose 
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Generate realistic data based on developer
  const getDeveloperData = (name: string) => {
    const baseData = {
      'SlotMaster': {
        totalRevenue: 124000,
        totalWagered: 67800000,
        totalPlayers: 3200000,
        monthlyGrowth: 19,
        joinDate: 'Dec 2023',
        activeCasinos: 156,
        rating: 4.6,
        games: [
          { name: 'Solana Slots', revenue: 78000, players: 1800000, wagered: 42000000, growth: 15 },
          { name: 'Mega Jackpot', revenue: 32000, players: 950000, wagered: 18500000, growth: 28 },
          { name: 'Classic Reels', revenue: 14000, players: 450000, wagered: 7300000, growth: 12 }
        ]
      },
      'CryptoWizard.sol': {
        totalRevenue: 89000,
        totalWagered: 45600000,
        totalPlayers: 2400000,
        monthlyGrowth: 34,
        joinDate: 'Jan 2024',
        activeCasinos: 127,
        rating: 4.9,
        games: [
          { name: 'Quantum Roulette', revenue: 56000, players: 1500000, wagered: 28000000, growth: 42 },
          { name: 'Mystic Wheel', revenue: 23000, players: 650000, wagered: 12800000, growth: 31 },
          { name: 'Fortune Spinner', revenue: 10000, players: 250000, wagered: 4800000, growth: 18 }
        ]
      },
      'RaffleLord': {
        totalRevenue: 78000,
        totalWagered: 41200000,
        totalPlayers: 2100000,
        monthlyGrowth: 25,
        joinDate: 'Jan 2024',
        activeCasinos: 112,
        rating: 4.5,
        games: [
          { name: 'Lottery Legends', revenue: 45000, players: 1200000, wagered: 24000000, growth: 29 },
          { name: 'Daily Draw', revenue: 21000, players: 600000, wagered: 11500000, growth: 22 },
          { name: 'Mega Millions', revenue: 12000, players: 300000, wagered: 5700000, growth: 19 }
        ]
      },
      'DegenBuilder': {
        totalRevenue: 67000,
        totalWagered: 32400000,
        totalPlayers: 1800000,
        monthlyGrowth: 28,
        joinDate: 'Feb 2024',
        activeCasinos: 98,
        rating: 4.7,
        games: [
          { name: 'Hyper Crash', revenue: 41000, players: 1100000, wagered: 20500000, growth: 35 },
          { name: 'Rocket Rush', revenue: 18000, players: 500000, wagered: 8900000, growth: 24 },
          { name: 'Moon Shot', revenue: 8000, players: 200000, wagered: 3000000, growth: 15 }
        ]
      },
      'FlipMaster': {
        totalRevenue: 124000,
        totalWagered: 67800000,
        totalPlayers: 3200000,
        monthlyGrowth: 19,
        joinDate: 'Dec 2023',
        activeCasinos: 156,
        rating: 4.6,
        games: [
          { name: 'Coin Flip Pro', revenue: 78000, players: 1800000, wagered: 42000000, growth: 15 },
          { name: 'Double or Nothing', revenue: 32000, players: 950000, wagered: 18500000, growth: 28 },
          { name: 'Lucky Flip', revenue: 14000, players: 450000, wagered: 7300000, growth: 12 }
        ]
      },
      'DiamondHands': {
        totalRevenue: 58000,
        totalWagered: 28900000,
        totalPlayers: 1500000,
        monthlyGrowth: 42,
        joinDate: 'Mar 2024',
        activeCasinos: 85,
        rating: 4.8,
        games: [
          { name: 'Diamond Mines', revenue: 35000, players: 900000, wagered: 17500000, growth: 48 },
          { name: 'Gem Hunter', revenue: 15000, players: 400000, wagered: 7800000, growth: 39 },
          { name: 'Treasure Quest', revenue: 8000, players: 200000, wagered: 3600000, growth: 35 }
        ]
      },
      'LoveGuru.eth': {
        totalRevenue: 45000,
        totalWagered: 23400000,
        totalPlayers: 890000,
        monthlyGrowth: 31,
        joinDate: 'Apr 2024',
        activeCasinos: 67,
        rating: 4.9,
        games: [
          { name: 'Date or NGMI', revenue: 28000, players: 550000, wagered: 14500000, growth: 35 },
          { name: 'Love Roulette', revenue: 12000, players: 240000, wagered: 6200000, growth: 28 },
          { name: 'Heart Breaker', revenue: 5000, players: 100000, wagered: 2700000, growth: 25 }
        ]
      }
    };

    return baseData[name as keyof typeof baseData] || baseData['FlipMaster'];
  };

  const data = getDeveloperData(developer.name);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-overlay backdrop-blur-card">
      <div className="h-full flex flex-col">
        {/* Header with X button */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background/95">
          <h2 className="text-xl font-bold text-text-primary">Developer Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-tertiary hover:text-text-primary transition-colors rounded-lg hover:bg-background-card"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Card variant="premium" className="mb-6">
            {/* Developer Header */}
            <div className="relative p-6 bg-gradient-primary/10 border-b border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-magenta/20" />
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={developer.avatar} 
                    alt={developer.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Trophy size={16} className="text-background" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{developer.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={16} fill="currentColor" />
                      <span className="text-base font-medium text-text-primary">{data.rating}</span>
                    </div>
                    <div className="text-base text-text-tertiary">Since {data.joinDate}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-primary/10 rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-primary" size={20} />
                    <span className="text-sm text-text-tertiary">Monthly Revenue</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(data.totalRevenue)}</div>
                </div>
                
                <div className="bg-gradient-secondary/10 rounded-xl p-4 border border-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-secondary" size={20} />
                    <span className="text-sm text-text-tertiary">Growth Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary">+{data.monthlyGrowth}%</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Users className="text-accent-magenta" size={16} />
                  </div>
                  <div className="text-lg font-bold text-text-primary">{formatNumber(data.totalPlayers)}</div>
                  <div className="text-xs text-text-tertiary">Players</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <BarChart3 className="text-primary" size={16} />
                  </div>
                  <div className="text-lg font-bold text-text-primary">{formatCurrency(data.totalWagered)}</div>
                  <div className="text-xs text-text-tertiary">Wagered</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Globe className="text-secondary" size={16} />
                  </div>
                  <div className="text-lg font-bold text-text-primary">{data.activeCasinos}</div>
                  <div className="text-xs text-text-tertiary">Casinos</div>
                </div>
              </div>

              {/* Games Portfolio */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad2 className="text-accent-magenta" size={20} />
                  <h4 className="text-lg font-bold text-text-primary">Game Portfolio</h4>
                </div>
                <div className="space-y-3">
                  {data.games.map((game, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background-card border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-text-primary">{game.name}</h5>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="text-accent-magenta" size={12} />
                          <span className="text-sm font-medium text-accent-magenta">+{game.growth}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-text-tertiary mb-1">Revenue</div>
                          <div className="font-medium text-primary">{formatCurrency(game.revenue)}</div>
                        </div>
                        <div>
                          <div className="text-text-tertiary mb-1">Players</div>
                          <div className="font-medium text-text-primary">{formatNumber(game.players)}</div>
                        </div>
                        <div>
                          <div className="text-text-tertiary mb-1">Wagered</div>
                          <div className="font-medium text-text-primary">{formatCurrency(game.wagered)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Appeal */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-magenta/10 border border-primary/20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-primary" size={18} />
                  <span className="text-base font-medium text-text-primary">Investment Highlights</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">ROI Potential:</span>
                    <span className="font-medium text-secondary">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Risk Level:</span>
                    <span className="font-medium text-accent-magenta">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Market Share:</span>
                    <span className="font-medium text-primary">{((data.totalWagered / 500000000) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Stability:</span>
                    <span className="font-medium text-secondary">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Close Button at bottom */}
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileDeveloperModal;