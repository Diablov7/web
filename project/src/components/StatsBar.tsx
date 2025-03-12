import React from 'react';
import { TrendingUp, Users, Rocket } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import DashboardCard from './DashboardCard';

const generateChartData = () => {
  // Base values with more randomness
  const generateRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate random points with overall upward trend
  const points = Array.from({ length: 12 }).map((_, index) => {
    const trendValue = 25 + (index * 5); // Base upward trend
    const randomVariation = generateRandomValue(-15, 15); // Larger random variations
    const finalValue = Math.min(95, Math.max(25, trendValue + randomVariation));
    return finalValue;
  });

  // Ensure first point is low and last point is high
  points[0] = generateRandomValue(25, 35);
  points[points.length - 1] = generateRandomValue(85, 95);
  
  return points.map((value, index) => ({
    name: `M${index + 1}`,
    value: value
  }));
};

const CircularProgress = ({ value, color }: { value: number; color: string }) => {
  return (
    <div 
      className="w-16 h-16 sm:w-20 sm:h-20"
      style={{ filter: `drop-shadow(0 0 10px ${color}40)` }}
    >
      <CircularProgressbar
        value={value}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: color,
          trailColor: `${color}20`,
          strokeLinecap: 'round'
        })}
      />
    </div>
  );
};

const AreaChartComponent = ({ data, color }: { data: any[]; color: string }) => {
  return (
    <div className="h-48 sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`line${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis 
            dataKey="name" 
            stroke="#ffffff60"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#ffffff60" 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            width={30}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(13, 13, 26, 0.9)',
              border: `1px solid ${color}30`,
              borderRadius: '8px',
              boxShadow: `0 0 20px ${color}20`,
              fontSize: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value"
            stroke={color}
            fill={`url(#line${color})`}
            strokeWidth={2}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function StatsBar() {
  const stats = [
    {
      label: "Project Growth",
      icon: TrendingUp,
      color: "#00D1C4",
      value: 85
    },
    {
      label: "Community Growth",
      icon: Users,
      color: "#00D1C4",
      value: 92
    },
    {
      label: "Average ROI",
      icon: Rocket,
      color: "#00D1C4",
      value: 78
    }
  ];

  const growthData = React.useMemo(() => generateChartData(), []);
  const engagementData = React.useMemo(() => generateChartData(), []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.label}
            neonColor={stat.color}
            className="p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div 
                className="p-2 sm:p-3 rounded-lg"
                style={{
                  background: `linear-gradient(145deg, ${stat.color}30, ${stat.color}10)`
                }}
              >
                <stat.icon 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={{ color: stat.color }} 
                /> 
              </div>
              <CircularProgress value={stat.value} color={stat.color} />
            </div>
          </DashboardCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <DashboardCard
          title="Growth Trend"
          neonColor="#00D1C4"
          className="p-4 sm:p-6"
        >
          <AreaChartComponent data={growthData} color="#00D1C4" />
        </DashboardCard>

        <DashboardCard
          title="Engagement Metric"
          neonColor="#00D1C4"
          className="p-4 sm:p-6"
        >
          <AreaChartComponent data={engagementData} color="#00D1C4" />
        </DashboardCard>
      </div>
    </div>
  );
}