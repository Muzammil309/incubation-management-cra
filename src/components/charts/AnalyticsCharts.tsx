import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Mock data for charts
const attendanceTrendData = [
  { month: 'Apr', attendees: 120 },
  { month: 'May', attendees: 180 },
  { month: 'Jun', attendees: 250 },
  { month: 'Jul', attendees: 320 },
  { month: 'Aug', attendees: 280 },
  { month: 'Sep', attendees: 400 }
];

const ticketSalesData = [
  { event: 'Startup Pitch', sales: 45 },
  { event: 'Tech Summit', sales: 78 },
  { event: 'AI Workshop', sales: 32 },
  { event: 'Networking Event', sales: 56 },
  { event: 'Demo Day', sales: 89 }
];

const userDistributionData = [
  { name: 'Attendees', value: 450, color: '#487FFF' },
  { name: 'Speakers', value: 85, color: '#22c55e' },
  { name: 'Admins', value: 12, color: '#f59e0b' }
];

const revenueGrowthData = [
  { month: 'Apr', revenue: 5200 },
  { month: 'May', revenue: 7800 },
  { month: 'Jun', revenue: 9500 },
  { month: 'Jul', revenue: 12400 },
  { month: 'Aug', revenue: 11200 },
  { month: 'Sep', revenue: 15600 }
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-200">
        <p className="text-sm font-semibold text-neutral-800 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-neutral-600">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Attendance Trend Line Chart
export const AttendanceTrendChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Event Attendance Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="attendees"
            stroke="#487FFF"
            strokeWidth={3}
            dot={{ fill: '#487FFF', r: 5 }}
            activeDot={{ r: 7 }}
            name="Attendees"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Ticket Sales Bar Chart
export const TicketSalesChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Ticket Sales by Event</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ticketSalesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="event" stroke="#6B7280" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} name="Tickets Sold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// User Distribution Pie Chart
export const UserDistributionChart: React.FC = () => {
  const renderLabel = (entry: any) => {
    return `${entry.name}: ${entry.value}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">User Distribution by Role</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={userDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {userDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Revenue Growth Area Chart
export const RevenueGrowthChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Revenue Growth Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueGrowthData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f59e0b"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Revenue ($)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Combined Analytics Dashboard Component
export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceTrendChart />
        <TicketSalesChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserDistributionChart />
        <RevenueGrowthChart />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

