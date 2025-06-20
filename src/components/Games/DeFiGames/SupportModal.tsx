import React, { useEffect } from 'react';
import { X, Twitter, Heart, Rocket, Star, Code, Users, Zap } from 'lucide-react';
import { Button } from '../../UI/Button';
import Card from '../../UI/Card';

interface SupportModalProps {
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-overlay backdrop-blur-card">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <Card variant="premium" className="relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-tertiary hover:text-text-primary transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Rocket className="text-background" size={20} />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Coming Soon!
                </h2>
              </div>
              <p className="text-lg text-text-secondary mb-2">
                This is a preview of what we're building
              </p>
              <p className="text-sm text-text-tertiary">
                The future of decentralized gambling infrastructure
              </p>
            </div>

            {/* Vision Section */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-card border border-primary/20">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <Star className="text-primary flex-shrink-0" size={18} />
                Our Vision for the Next Few Months
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Code className="text-primary" size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Developer SDK</h4>
                      <p className="text-xs text-text-secondary">One-click game deployment with smart contract templates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="text-secondary" size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Casino Marketplace</h4>
                      <p className="text-xs text-text-secondary">Fork any casino, customize, and launch your own empire</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-accent-magenta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="text-accent-magenta" size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Revenue Sharing</h4>
                      <p className="text-xs text-text-secondary">Automatic 1% earnings from every casino using your games</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Rocket className="text-primary" size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Global Network</h4>
                      <p className="text-xs text-text-secondary">Instant distribution across hundreds of casinos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Depends Section */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-secondary/10 border border-secondary/20">
              <h3 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                <Heart className="text-secondary flex-shrink-0" size={18} />
                Our Success Depends on YOU!
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                We're building the infrastructure that will revolutionize gambling forever. But we need the community's support to make this vision a reality.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="text-lg font-bold text-primary mb-1">🚀</div>
                  <div className="text-xs font-medium text-text-primary">Spread the Word</div>
                  <div className="text-xs text-text-tertiary">Help us reach developers</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="text-lg font-bold text-secondary mb-1">💎</div>
                  <div className="text-xs font-medium text-text-primary">Join the Movement</div>
                  <div className="text-xs text-text-tertiary">Be part of the revolution</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background-card border border-border">
                  <div className="text-lg font-bold text-accent-magenta mb-1">🔥</div>
                  <div className="text-xs font-medium text-text-primary">Early Supporter</div>
                  <div className="text-xs text-text-tertiary">Get exclusive benefits</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Support Us on X (Twitter)!
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                Follow our journey, get exclusive updates, and help us build the future of decentralized gambling!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                <a
                  href="https://x.com/GMBLR_Solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto"
                >
                  <Button variant="premium" size="md" className="w-full sm:min-w-[200px] group-hover:scale-105 transition-transform">
                    <Twitter size={18} className="mr-2" />
                    Follow @GMBLR_Solana
                  </Button>
                </a>
                
                <div className="flex items-center gap-2 text-text-tertiary">
                  <span className="text-sm">or</span>
                </div>
                
                <Button variant="outline" size="md" onClick={onClose} className="w-full sm:w-auto sm:min-w-[150px]">
                  Maybe Later
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-primary">Early supporters get:</strong> Exclusive access to beta features, 
                  priority support, and special recognition in our community! 🎉
                </p>
              </div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              >
                <div className="text-2xl">
                  {['🚀', '💎', '🔥', '⚡'][i]}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupportModal;