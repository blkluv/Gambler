import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, BarChart3, Database, DollarSign, Info } from 'lucide-react';
import { Button } from '../UI/Button';
import Card from '../UI/Card';
import { StakingInfo, Transaction } from '../../types';

// Sample staking data
const initialStakingInfo: StakingInfo = {
  totalSolStaked: 15420,
  totalGambleStaked: 5482000,
  apy: 12.4,
  userSolStaked: 4.38,
  userGambleStaked: 1420,
  pendingRewards: 0.12
};

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'stake',
    amount: 2.5,
    token: 'SOL',
    timestamp: Date.now() - 3600000,
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'claim',
    amount: 0.08,
    token: 'SOL',
    timestamp: Date.now() - 86400000,
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'unstake',
    amount: 1.2,
    token: 'SOL',
    timestamp: Date.now() - 172800000,
    status: 'confirmed'
  }
];

const StakingDashboard: React.FC = () => {
  const [stakingInfo, setStakingInfo] = useState<StakingInfo>(initialStakingInfo);
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [unstakeAmount, setUnstakeAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      const amount = parseFloat(stakeAmount);
      setStakingInfo(prev => ({
        ...prev,
        userSolStaked: prev.userSolStaked + amount,
        totalSolStaked: prev.totalSolStaked + amount
      }));
      setStakeAmount('');
      setIsStaking(false);
    }, 2000);
  };

  const handleUnstake = () => {
    setIsUnstaking(true);
    setTimeout(() => {
      const amount = parseFloat(unstakeAmount);
      setStakingInfo(prev => ({
        ...prev,
        userSolStaked: prev.userSolStaked - amount,
        totalSolStaked: prev.totalSolStaked - amount
      }));
      setUnstakeAmount('');
      setIsUnstaking(false);
    }, 2000);
  };

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setStakingInfo(prev => ({
        ...prev,
        pendingRewards: 0
      }));
      setIsClaiming(false);
    }, 2000);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Staking Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Stake SOL to earn platform fees and $GAMBLE token rewards. All platform fees are distributed to stakers in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#FFB800]/10 flex items-center justify-center mr-4">
              <Database className="text-[#FFB800]" size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Total SOL Staked</div>
              <div className="text-2xl font-bold text-white">
                {stakingInfo.totalSolStaked.toLocaleString()} SOL
              </div>
            </div>
          </Card>

          <Card className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#00A3FF]/10 flex items-center justify-center mr-4">
              <DollarSign className="text-[#00A3FF]" size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Total $GAMBLE Staked</div>
              <div className="text-2xl font-bold text-white">
                {stakingInfo.totalGambleStaked.toLocaleString()} GAMBLE
              </div>
            </div>
          </Card>

          <Card className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#28A745]/10 flex items-center justify-center mr-4">
              <BarChart3 className="text-[#28A745]" size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Current APY</div>
              <div className="text-2xl font-bold text-[#28A745]">
                {stakingInfo.apy}%
              </div>
            </div>
          </Card>

          <Card className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#9C27B0]/10 flex items-center justify-center mr-4">
              <DollarSign className="text-[#9C27B0]" size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Pending Rewards</div>
              <div className="text-2xl font-bold text-[#9C27B0]">
                {stakingInfo.pendingRewards.toFixed(3)} SOL
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card title="Your Staking Position">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Your SOL Staked</div>
                  <div className="text-3xl font-bold text-white mb-4">
                    {stakingInfo.userSolStaked.toFixed(2)} SOL
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      id="stakeInput"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50"
                      placeholder="Enter amount"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={handleStake}
                      disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                      isLoading={isStaking}
                    >
                      <ArrowUpRight size={16} className="mr-2" />
                      Stake
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Your $GAMBLE Staked</div>
                  <div className="text-3xl font-bold text-white mb-4">
                    {stakingInfo.userGambleStaked.toLocaleString()} GAMBLE
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      id="unstakeInput"
                      type="number"
                      min="0.1"
                      step="0.1"
                      max={stakingInfo.userSolStaked}
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50"
                      placeholder="Enter amount"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleUnstake}
                      disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0 || parseFloat(unstakeAmount) > stakingInfo.userSolStaked}
                      isLoading={isUnstaking}
                    >
                      <ArrowDownRight size={16} className="mr-2" />
                      Unstake
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                variant="success"
                size="sm"
                className="w-full"
                onClick={handleClaim}
                disabled={stakingInfo.pendingRewards === 0}
                isLoading={isClaiming}
              >
                Claim {stakingInfo.pendingRewards.toFixed(3)} SOL
              </Button>
            </Card>

            <Card title="Transaction History" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400">
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-t border-white/10">
                        <td className="py-4">
                          <span className="capitalize">{tx.type}</span>
                        </td>
                        <td className="py-4">
                          {tx.amount} {tx.token}
                        </td>
                        <td className="py-4 text-gray-400">
                          {formatDate(tx.timestamp)}
                        </td>
                        <td className="py-4">
                          <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                            tx.status === 'confirmed' ? 'bg-[#28A745]/10 text-[#28A745]' :
                            tx.status === 'pending' ? 'bg-[#FFB800]/10 text-[#FFB800]' :
                            'bg-[#DC3545]/10 text-[#DC3545]'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Staking Info">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">How it Works</h4>
                  <p className="text-gray-400 text-sm">
                    Stake your SOL to earn a share of all platform fees. 1% of every game's fees are distributed to stakers in real-time.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Rewards</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Platform Fees</span>
                    <span className="text-sm text-white">1%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">$GAMBLE Rewards</span>
                    <span className="text-sm text-white">100 GAMBLE/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Current APY</span>
                    <span className="text-sm text-[#28A745]">{stakingInfo.apy}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Your Share</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Pool Share</span>
                    <span className="text-sm text-white">
                      {((stakingInfo.userSolStaked / stakingInfo.totalSolStaked) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Daily Estimate</span>
                    <span className="text-sm text-[#28A745]">
                      ~{(stakingInfo.userSolStaked * (stakingInfo.apy / 100) / 365).toFixed(3)} SOL
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-lg flex items-start">
                  <Info size={20} className="text-[#FFB800] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    Staking rewards are automatically distributed every 24 hours. You can claim your rewards at any time.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingDashboard;