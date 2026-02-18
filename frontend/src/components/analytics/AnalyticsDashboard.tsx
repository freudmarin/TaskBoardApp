import React, { useEffect, useState } from 'react';
import { analyticsApi, AnalyticsOverview, CardMetrics } from '../../api/analytics';

export const AnalyticsDashboard: React.FC = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [cardMetrics, setCardMetrics] = useState<CardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [refreshKey]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAnalytics();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, cardData] = await Promise.all([
        analyticsApi.getOverview(),
        analyticsApi.getCardMetrics(),
      ]);
      setOverview(overviewData);
      setCardMetrics(cardData);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const totalPriorityCards = cardMetrics
    ? cardMetrics.priorityDistribution.low +
      cardMetrics.priorityDistribution.medium +
      cardMetrics.priorityDistribution.high
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your board activity and productivity metrics
            {autoRefresh && <span className="ml-2 text-green-600">• Auto-refreshing every 5s</span>}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Auto-refresh</span>
          </label>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Now
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard
          title="Total Boards"
          value={overview?.totalBoardsCreated || 0}
          icon="📋"
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Lists"
          value={overview?.totalListsCreated || 0}
          icon="📑"
          color="bg-indigo-500"
        />
        <MetricCard
          title="Total Cards"
          value={overview?.totalCardsCreated || 0}
          icon="📝"
          color="bg-green-500"
        />
        <MetricCard
          title="Card Moves"
          value={overview?.totalCardsMoved || 0}
          icon="🔄"
          color="bg-purple-500"
        />
        <MetricCard
          title="Avg Moves/Card"
          value={overview?.avgMovesPerCard?.toFixed(2) || '0.00'}
          icon="📊"
          color="bg-orange-500"
        />
      </div>

      {/* Card Priority Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Card Priority Distribution</h2>
        {cardMetrics && totalPriorityCards > 0 ? (
          <div className="space-y-4">
            <PriorityBar
              label="High Priority"
              count={cardMetrics.priorityDistribution.high}
              total={totalPriorityCards}
              color="bg-red-500"
            />
            <PriorityBar
              label="Medium Priority"
              count={cardMetrics.priorityDistribution.medium}
              total={totalPriorityCards}
              color="bg-yellow-500"
            />
            <PriorityBar
              label="Low Priority"
              count={cardMetrics.priorityDistribution.low}
              total={totalPriorityCards}
              color="bg-green-500"
            />
          </div>
        ) : (
          <p className="text-gray-500">No card data available yet</p>
        )}
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityItem
            label="Cards Created"
            value={cardMetrics?.totalCreated || 0}
            description="Total number of cards created across all boards"
          />
          <ActivityItem
            label="Cards Moved"
            value={cardMetrics?.totalMoved || 0}
            description="Total number of card movements between lists"
          />
          <ActivityItem
            label="Boards Created"
            value={overview?.totalBoardsCreated || 0}
            description="Total number of boards created"
          />
          <ActivityItem
            label="Activity Rate"
            value={
              overview && overview.totalCardsCreated > 0
                ? `${Math.round((overview.totalCardsMoved / overview.totalCardsCreated) * 100)}%`
                : '0%'
            }
            description="Percentage of cards that have been moved"
          />
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Last updated: {overview ? new Date(overview.timestamp).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} text-white rounded-full p-3 text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

// Priority Bar Component
interface PriorityBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

const PriorityBar: React.FC<PriorityBarProps> = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">
          {count} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${color} h-4 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Activity Item Component
interface ActivityItemProps {
  label: string;
  value: string | number;
  description: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ label, value, description }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      <span className="text-2xl font-bold text-primary-600">{value}</span>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

