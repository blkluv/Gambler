import React, { useState, useEffect, useRef } from 'react';
import { Heart, History, Info, Trophy, Crown, Skull } from 'lucide-react';
import { Button } from '../../UI/Button';
import Card from '../../UI/Card';
import FeeTooltip from '../../UI/FeeTooltip';
import gsap from 'gsap';

interface Character {
  name: string;
  image: string;
  description: string;
  hasRisk?: boolean;
}

interface GameHistoryEntry {
  bet: number;
  character: string;
  won: boolean;
  multiplier: number;
  timestamp: number;
}

interface LeaderboardEntry {
  name: string;
  pfp: string;
  winStreak: number;
  totalWon: number;
  timestamp: number;
}

const BASE_CHARACTERS: Character[] = [
  {
    name: "El Pepo",
    image: "/images/elpepo.png",
    description: "Mysterious and charming. Known for his smooth blockchain moves. Always ready to take you to the moon! 🚀"
  },
  {
    name: "Pepina",
    image: "/images/pepina.png",
    description: "Sweet and caring. Loves DeFi and long walks on the blockchain. Will stake with you forever! 💕"
  },
  {
    name: "Pepa",
    image: "/images/pepa.png",
    description: "Adventurous spirit. Always ready for the next moon mission. Believes in HODL and true love! ✨"
  }
];

const DEGEN_LEADERBOARD: LeaderboardEntry[] = [
  { name: "GIGACHAD.sol", pfp: "/images/gigachad.png", winStreak: 7, totalWon: 42.0, timestamp: Date.now() - 120000 },
  { name: "wojak.eth", pfp: "/images/wojak.png", winStreak: 5, totalWon: 28.5, timestamp: Date.now() - 300000 },
  { name: "DumpItPamp", pfp: "/images/pepe.png", winStreak: 4, totalWon: 16.9, timestamp: Date.now() - 600000 },
  { name: "MoonBoi420", pfp: "/images/doge.png", winStreak: 3, totalWon: 12.4, timestamp: Date.now() - 900000 },
  { name: "LaserEyesMAXI", pfp: "/images/laser-eyes.png", winStreak: 2, totalWon: 8.8, timestamp: Date.now() - 1200000 }
];

const DateGame: React.FC = () => {
  const [betAmount, setBetAmount] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>(() => {
    const saved = localStorage.getItem('dateGameHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [numRiskyOptions, setNumRiskyOptions] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const resultTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const characterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    shuffleRisks();
  }, [numRiskyOptions]);

  const shuffleRisks = () => {
    // Create a copy of the base characters
    const shuffled = [...BASE_CHARACTERS];
    
    // First shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Now randomly assign risks based on numRiskyOptions
    const riskyIndices = new Set<number>();
    while (riskyIndices.size < numRiskyOptions) {
      riskyIndices.add(Math.floor(Math.random() * shuffled.length));
    }
    
    // Assign risks based on the random indices
    shuffled.forEach((char, index) => {
      char.hasRisk = riskyIndices.has(index);
    });
    
    setCharacters(shuffled);
    setSelectedCharacter(null);
  };

  const getMultiplier = () => {
    switch(numRiskyOptions) {
      case 1: return 2;
      case 2: return 3;
      default: return 2;
    }
  };

  useEffect(() => {
    localStorage.setItem('dateGameHistory', JSON.stringify(gameHistory.slice(0, 50)));
  }, [gameHistory]);

  const createParticles = (won: boolean) => {
    if (!particlesRef.current) return;

    const container = particlesRef.current;
    container.innerHTML = '';

    const memeImages = won ? ['moon', 'gmi', 'chad'] : ['ngmi', 'crying-wojak', 'rug'];
    const count = won ? 30 : 20;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const memeImg = document.createElement('img');
      memeImg.src = `/images/${memeImages[Math.floor(Math.random() * memeImages.length)]}.png`;
      memeImg.className = 'w-8 h-8 object-contain';
      particle.appendChild(memeImg);
      particle.className = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';

      const angle = (i / count) * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      const duration = 0.5 + Math.random() * 0.5;
      const scale = 0.5 + Math.random() * 1.5;

      container.appendChild(particle);

      gsap.fromTo(particle,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
          rotation: 0
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: scale,
          opacity: 0,
          rotation: Math.random() * 360,
          duration: duration,
          ease: 'power2.out',
          onComplete: () => particle.remove()
        }
      );
    }
  };

  const showResultText = (text: string, color: string) => {
    if (!resultTextRef.current) return;

    const resultText = resultTextRef.current;
    resultText.textContent = text;
    resultText.style.color = color;

    gsap.fromTo(resultText,
      {
        scale: 0,
        opacity: 0,
        y: 0
      },
      {
        scale: 1,
        opacity: 1,
        y: -50,
        duration: 0.5,
        ease: 'back.out(1.7)',
        onComplete: () => {
          gsap.to(resultText, {
            opacity: 0,
            y: -100,
            duration: 0.5,
            delay: 1
          });
        }
      }
    );
  };

  const revealResult = () => {
    if (!selectedCharacter || isRevealing) return;
    setIsRevealing(true);

    const won = !selectedCharacter.hasRisk;
    const multiplier = getMultiplier();

    characterRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const character = characters[index];
      const isSelected = character.name === selectedCharacter.name;

      gsap.to(ref, {
        rotationY: 180,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: isSelected ? 0 : 0.2 * index,
        onComplete: () => {
          if (isSelected) {
            if (won) {
              showResultText(`WAGMI! +${(betAmount * multiplier).toFixed(2)} SOL 🚀`, '#28A745');
              createParticles(true);
              setCurrentStreak(prev => {
                const newStreak = prev + 1;
                setBestStreak(current => Math.max(current, newStreak));
                return newStreak;
              });
            } else {
              showResultText('NGMI! Got Rugged! 💀', '#DC3545');
              createParticles(false);
              setCurrentStreak(0);
            }

            setGameHistory(prev => [{
              bet: betAmount,
              character: selectedCharacter.name,
              won,
              multiplier,
              timestamp: Date.now()
            }, ...prev].slice(0, 50));

            setTimeout(() => {
              setIsRevealing(false);
              setSelectedCharacter(null);
              shuffleRisks();
              characterRefs.current.forEach(ref => {
                if (ref) {
                  gsap.to(ref, {
                    rotationY: 0,
                    duration: 0.3
                  });
                }
              });
            }, 2000);
          }
        }
      });
    });
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FFB800] via-[#FF3D00] to-[#FF9100] bg-clip-text text-transparent">
            💘 DATE OR NGMI
          </h1>
          <div className="px-3 py-1 rounded-full bg-[#FFB800]/20 border border-[#FFB800]/30">
            <span className="text-[#FFB800] text-sm font-medium">LIVE 🔥</span>
          </div>
        </div>

        <p className="text-xl text-gray-400 mb-8">
          Choose your date wisely! Some carry hidden risks that will rug your heart (and wallet)! 💔
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden p-8">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
              <div ref={resultTextRef} className="absolute text-4xl font-bold z-20 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {characters.map((character, index) => (
                  <div
                    key={character.name}
                    ref={el => characterRefs.current[index] = el}
                    className="preserve-3d min-h-[480px] cursor-pointer transition-transform"
                    style={{
                      transform: selectedCharacter?.name === character.name ? 'scale(1.05)' : 'scale(1)',
                      pointerEvents: isRevealing ? 'none' : 'auto'
                    }}
                    onClick={() => !isRevealing && setSelectedCharacter(character)}
                  >
                    <div className="absolute inset-0 backface-hidden">
                      <div className={`h-full rounded-2xl overflow-hidden border flex flex-col ${
                        selectedCharacter?.name === character.name 
                          ? 'border-primary/30 bg-gradient-to-br from-primary/10 to-transparent' 
                          : 'border-white/10 bg-white/5'
                      }`}>
                        <div className="relative h-[280px]">
                          <img
                            src={character.image}
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold mb-3">{character.name}</h3>
                          <p className="text-gray-400 text-lg leading-relaxed">{character.description}</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 backface-hidden"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className={`h-full rounded-2xl flex items-center justify-center ${
                        character.hasRisk 
                          ? 'bg-danger/20 border-danger/30' 
                          : 'bg-success/20 border-success/30'
                      } border`}>
                        {character.hasRisk ? (
                          <div className="text-center">
                            <Skull className="w-24 h-24 mx-auto mb-6 text-[#DC3545]" />
                            <p className="text-[#DC3545] font-bold text-2xl">NGMI! Got Rugged! 💀</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Heart className="w-24 h-24 mx-auto mb-6 text-[#28A745]" />
                            <p className="text-[#28A745] font-bold text-2xl">WAGMI! Perfect Match! 🚀</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="premium"
                size="lg"
                onClick={revealResult}
                disabled={!selectedCharacter || isRevealing}
                className="min-w-[200px] mt-8"
              >
                {isRevealing ? 'Revealing...' : 'Shoot Your Shot! 💘'}
              </Button>
            </Card>

            <Card title="Recent Dates" className="mt-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gameHistory.slice(0, 10).map((game, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: game.won ? '#28A74520' : '#DC354520' }}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-lg font-bold ${game.won ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                        {game.won ? '❤️' : '💔'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(game.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card title="Place Bet" variant="premium">
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Bet Amount (SOL)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Number of Risky Options
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumRiskyOptions(num)}
                      className={`
                        py-2 rounded-lg text-sm font-medium
                        ${numRiskyOptions === num
                          ? 'bg-primary text-background'
                          : 'bg-white/5 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {num} ({num === 1 ? '2x' : '3x'})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Fee (2%)</span>
                <div className="flex items-center">
                  <span className="text-white">{(betAmount * 0.02).toFixed(2)} SOL</span>
                  <FeeTooltip className="ml-2" />
                </div>
              </div>

              <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-lg flex items-start">
                <Info size={20} className="text-[#FFB800] mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  More risky options = higher multiplier! Choose 1 risk for 2x or 2 risks for 3x rewards! 💘
                </p>
              </div>
            </Card>

            <Card title="🏆 DEGEN Daters" variant="premium">
              <div className="space-y-4">
                {DEGEN_LEADERBOARD.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={entry.pfp} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{entry.name}</span>
                        {index === 0 && <Crown size={16} className="text-[#FFB800]" />}
                      </div>
                      <div className="text-sm text-gray-400">{formatTimeAgo(entry.timestamp)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#28A745]">{entry.winStreak}x Streak</div>
                      <div className="text-sm text-gray-400">{entry.totalWon} SOL</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="📊 Your Stats" variant="premium">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-[#28A745] font-medium">{currentStreak}x</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="text-[#FFB800] font-medium">{bestStreak}x</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Dates</span>
                  <span className="text-white font-medium">{gameHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-white font-medium">
                    {gameHistory.length > 0
                      ? `${((gameHistory.filter(g => g.won).length / gameHistory.length) * 100).toFixed(1)}%`
                      : '0%'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateGame;