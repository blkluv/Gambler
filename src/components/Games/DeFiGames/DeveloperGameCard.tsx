import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, MessageSquare, Star, DollarSign, BarChart3, Users, Copy, TrendingUp, Calendar, Globe, Play } from 'lucide-react';
import { Button } from '../../UI/Button';

interface DeveloperGameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  path?: string;
  developer?: {
    name: string;
    avatar: string;
    handle: string;
  };
  metrics?: {
    totalPlayers: number;
    totalWagered: number;
    developerEarnings: number;
    monthlyGrowth: number;
    launchDate: string;
    activeCasinos: number;
  };
  socialLinks?: {
    twitter: string;
    discord: string;
  };
  rating?: number;
  monthlyRevenue?: number;
  isCreateNew?: boolean;
  isComingSoon?: boolean;
  onOpenSupportModal?: () => void;
}

const DeveloperGameCard: React.FC<DeveloperGameCardProps> = ({
  title,
  description,
  icon,
  image,
  path,
  developer,
  metrics,
  socialLinks,
  rating,
  monthlyRevenue,
  isCreateNew = false,
  isComingSoon = false,
  onOpenSupportModal
}) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const handleCloneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Clone button clicked, opening support modal...');
    if (onOpenSupportModal) {
      onOpenSupportModal();
    }
  };

  const handleStartBuildingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Start Building button clicked, opening support modal...');
    if (onOpenSupportModal) {
      onOpenSupportModal();
    } else {
      console.error('onOpenSupportModal function not provided');
    }
  };

  if (isCreateNew) {
    return (
      <div 
        className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleStartBuildingClick}
      >
        {/* Animated border */}
        <div className="absolute -inset-[1px] bg-gradient-primary opacity-0 group-hover:opacity-100 bg-[length:200%_auto] rounded-2xl" />
        
        {/* Inner content container */}
        <div className="relative bg-background-card backdrop-blur-card h-full border border-border min-h-[400px] flex flex-col">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-[-100%] w-[300%] h-[200%] bg-gradient-to-r from-transparent via-text-primary/5 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>

          {/* Image container */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-[5%] flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10" />
            
            {/* Create New Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-primary border border-primary/30 z-20">
              <span className="text-text-primary text-sm font-medium">Create New</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-background-card border border-border flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-[2.5rem] leading-none font-title text-text-primary tracking-wide relative">
                <span className="relative z-10 font-bold">{title}</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </h3>
            </div>
            <p className="text-lg text-text-secondary mb-6 flex-1">{description}</p>
            
            <Button 
              variant="premium" 
              className="w-full"
              onClick={handleStartBuildingClick}
            >
              Start Building
            </Button>
          </div>

          {/* Subtle hover glow */}
          <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border */}
      <div className="absolute -inset-[1px] bg-gradient-primary opacity-0 group-hover:opacity-100 bg-[length:200%_auto] rounded-2xl" />
      
      {/* Inner content container */}
      <div className="relative bg-background-card backdrop-blur-card h-full border border-border min-h-[400px] flex flex-col">
        {/* Normal Card Content - Completely hidden when hovered */}
        <div className={`absolute inset-0 transition-all duration-200 ${
          isHovered ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}>
          {/* Shine effect overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-[-100%] w-[300%] h-[200%] bg-gradient-to-r from-transparent via-text-primary/5 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>

          {/* Image container */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-[5%] flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10" />
            
            {/* Developer Info */}
            {developer && (
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <img src={developer.avatar} alt={developer.name} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-xs font-bold text-text-primary">{developer.name}</div>
                  <div className="text-xs text-text-tertiary">{developer.handle}</div>
                </div>
              </div>
            )}

            {/* Rating or Coming Soon Badge */}
            {isComingSoon ? (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-secondary border border-accent-magenta/30 z-20">
                <span className="text-text-primary text-sm font-medium">Coming Soon</span>
              </div>
            ) : rating ? (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm z-20">
                <Star className="text-yellow-400" size={12} fill="currentColor" />
                <span className="text-xs font-bold text-text-primary">{rating}</span>
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-background-card border border-border flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-[2.5rem] leading-none font-title text-text-primary tracking-wide relative">
                <span className="relative z-10 font-bold">{title}</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </h3>
            </div>
            <p className="text-lg text-text-secondary mb-4">{description}</p>

            {/* Basic Metrics Bar */}
            {metrics && !isComingSoon && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs">
                  <Users size={12} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium">{formatNumber(metrics.totalPlayers)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <BarChart3 size={12} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium">{formatCurrency(metrics.totalWagered)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <DollarSign size={12} className="text-secondary" />
                  <span className="text-secondary font-medium">{formatCurrency(metrics.developerEarnings)}</span>
                </div>
              </div>
            )}

            {/* Social Links */}
            {socialLinks && (
              <div className="flex items-center gap-2 mt-auto">
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary transition-colors">
                  <Twitter size={16} />
                </a>
                <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary transition-colors">
                  <MessageSquare size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Subtle hover glow */}
          <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Professional Hover Overlay - Only visible when hovered */}
        <div className={`absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col p-4 transition-all duration-200 ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          {developer && (
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-2">
                <img src={developer.avatar} alt={developer.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-base font-bold text-text-primary">{developer.name}</div>
                  <div className="text-xs text-text-tertiary">{developer.handle}</div>
                </div>
                {rating && !isComingSoon && (
                  <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400/20">
                    <Star className="text-yellow-400" size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-text-primary">{rating}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detailed Metrics - More compact */}
          {metrics && !isComingSoon && (
            <div className="space-y-2 mb-3 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-background-card rounded-lg p-2 border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="text-primary" size={12} />
                    <span className="text-xs text-text-tertiary">Players</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">{formatNumber(metrics.totalPlayers)}</div>
                </div>
                
                <div className="bg-background-card rounded-lg p-2 border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <BarChart3 className="text-secondary" size={12} />
                    <span className="text-xs text-text-tertiary">Wagered</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">{formatCurrency(metrics.totalWagered)}</div>
                </div>
              </div>

              <div className="bg-gradient-primary/10 rounded-lg p-2 border border-primary/20">
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="text-primary" size={12} />
                  <span className="text-xs text-text-tertiary">Your 1% Developer Earnings</span>
                </div>
                <div className="text-lg font-bold text-primary">{formatCurrency(metrics.developerEarnings)}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="text-accent-magenta" size={10} />
                    <span className="text-xs text-text-tertiary">Growth</span>
                  </div>
                  <div className="text-xs font-bold text-accent-magenta">+{metrics.monthlyGrowth}%</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="text-secondary" size={10} />
                    <span className="text-xs text-text-tertiary">Since</span>
                  </div>
                  <div className="text-xs font-bold text-text-primary">{metrics.launchDate}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Globe className="text-primary" size={10} />
                    <span className="text-xs text-text-tertiary">Casinos</span>
                  </div>
                  <div className="text-xs font-bold text-text-primary">{metrics.activeCasinos}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons - 1.5x bigger and more readable */}
          <div className="space-y-2">
            {!isComingSoon && path && path !== '#' ? (
              <Link to={path} className="block">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full h-10 text-sm flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Play This Game
                </Button>
              </Link>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full h-10 text-sm flex items-center justify-center gap-2"
                disabled={isComingSoon}
              >
                <Play size={16} />
                {isComingSoon ? 'Coming Soon' : 'Play Game'}
              </Button>
            )}
            
            <Button 
              variant="premium" 
              size="sm" 
              className="w-full h-10 text-sm flex items-center justify-center gap-2"
              onClick={handleCloneClick}
            >
              <Copy size={16} />
              Clone & Customize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperGameCard;