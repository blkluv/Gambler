import React from 'react';
import { Star, DollarSign, BarChart3, Users, TrendingUp, Calendar, Globe, Gamepad2, Trophy, Zap } from 'lucide-react';

interface Game {
  name: string;
  revenue: number;
  players: number;
  wagered: number;
  growth: number;
}

interface DeveloperProfileProps {
  developer: {
    name: string;
    avatar: string;
    revenue: string;
  };
  position: { x: number; y: number };
  onClose: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ 
  developer, 
  position, 
  onClose, 
  onHover, 
  onLeave 
}) => {
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
      'LotteryLord': {
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
      'BaccaratBoss': {
        totalRevenue: 67000,
        totalWagered: 34500000,
        totalPlayers: 780000,
        monthlyGrowth: 29,
        joinDate: 'Mar 2024',
        activeCasinos: 89,
        rating: 4.8,
        games: [
          { name: 'Baccarat Bonanza', revenue: 42000, players: 450000, wagered: 21000000, growth: 32 },
          { name: 'VIP Tables', revenue: 19000, players: 230000, wagered: 9800000, growth: 28 },
          { name: 'Speed Baccarat', revenue: 6000, players: 100000, wagered: 3700000, growth: 22 }
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
      }
    };

    return baseData[name as keyof typeof baseData] || baseData['SlotMaster'];
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

  // Calculate position to keep modal in viewport
  const modalWidth = 400;
  const modalHeight = 600;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  let adjustedX = position.x;
  let adjustedY = position.y;
  
  // Adjust horizontal position
  if (position.x + modalWidth > viewportWidth - 20) {
    adjustedX = position.x - modalWidth - 20;
  }
  
  // Adjust vertical position
  if (position.y + modalHeight > viewportHeight - 20) {
    adjustedY = Math.max(20, viewportHeight - modalHeight - 20);
  }

  return (
    <>
      {/* Invisible bridge area to prevent flickering */}
      <div 
        className="fixed z-45"
        style={{ 
          left: `${Math.min(position.x - 20, adjustedX)}px`,
          top: `${adjustedY}px`,
          width: `${Math.abs(adjustedX - position.x) + 40}px`,
          height: '100px'
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
      
      {/* Profile Modal */}
      <div 
        className="fixed z-50 w-[400px]"
        style={{ 
          left: `${adjustedX}px`, 
          top: `${adjustedY}px`,
          maxHeight: '600px'
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="relative p-6 bg-gradient-primary/10 border-b border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-magenta/20" />
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <img 
                  src={developer.avatar} 
                  alt={developer.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Trophy size={12} className="text-background" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text-primary mb-1">{developer.name}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={14} fill="currentColor" />
                    <span className="text-sm font-medium text-text-primary">{data.rating}</span>
                  </div>
                  <div className="text-sm text-text-tertiary">Since {data.joinDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gradient-primary/10 rounded-xl p-3 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-primary" size={16} />
                  <span className="text-xs text-text-tertiary">Monthly Revenue</span>
                </div>
                <div className="text-lg font-bold text-primary">{formatCurrency(data.totalRevenue)}</div>
              </div>
              
              <div className="bg-gradient-secondary/10 rounded-xl p-3 border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="text-secondary" size={16} />
                  <span className="text-xs text-text-tertiary">Growth Rate</span>
                </div>
                <div className="text-lg font-bold text-secondary">+{data.monthlyGrowth}%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-lg bg-background-card border border-border">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="text-accent-magenta" size={12} />
                </div>
                <div className="text-sm font-bold text-text-primary">{formatNumber(data.totalPlayers)}</div>
                <div className="text-xs text-text-tertiary">Players</div>
              </div>
              
              <div className="text-center p-2 rounded-lg bg-background-card border border-border">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart3 className="text-primary" size={12} />
                </div>
                <div className="text-sm font-bold text-text-primary">{formatCurrency(data.totalWagered)}</div>
                <div className="text-xs text-text-tertiary">Wagered</div>
              </div>
              
              <div className="text-center p-2 rounded-lg bg-background-card border border-border">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Globe className="text-secondary" size={12} />
                </div>
                <div className="text-sm font-bold text-text-primary">{data.activeCasinos}</div>
                <div className="text-xs text-text-tertiary">Casinos</div>
              </div>
            </div>

            {/* Games Portfolio */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="text-accent-magenta" size={16} />
                <h4 className="font-bold text-text-primary">Game Portfolio</h4>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {data.games.map((game, index) => (
                  <div key={index} className="p-3 rounded-lg bg-background-card border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-text-primary text-sm">{game.name}</h5>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="text-accent-magenta" size={10} />
                        <span className="text-xs font-medium text-accent-magenta">+{game.growth}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-text-tertiary">Revenue</div>
                        <div className="font-medium text-primary">{formatCurrency(game.revenue)}</div>
                      </div>
                      <div>
                        <div className="text-text-tertiary">Players</div>
                        <div className="font-medium text-text-primary">{formatNumber(game.players)}</div>
                      </div>
                      <div>
                        <div className="text-text-tertiary">Wagered</div>
                        <div className="font-medium text-text-primary">{formatCurrency(game.wagered)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Appeal */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-magenta/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-primary" size={14} />
                <span className="text-xs font-medium text-text-primary">Investment Highlights</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperProfile;