import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactApexChart from 'react-apexcharts';

interface AdminChartsProps {
  startups: any[] | undefined;
}

const AdminCharts: React.FC<AdminChartsProps> = ({ startups }) => {
  // Build a simple time series: startups per month (last 6 months)
  const now = new Date();
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString(undefined, { month: 'short' }));
  }

  const counts = new Array(6).fill(0);
  (startups ?? []).forEach((s: any) => {
    const ts = s.created_at ? new Date(s.created_at) : null;
    if (!ts) return;
    const diffMonths = (now.getFullYear() - ts.getFullYear()) * 12 + (now.getMonth() - ts.getMonth());
    const idx = 5 - diffMonths;
    if (idx >= 0 && idx < 6) counts[idx] += 1;
  });

  const series = [{ name: 'Startups', data: counts }];
  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: { categories: months },
    dataLabels: { enabled: false },
    theme: { mode: 'light' },
  } as any;

  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
      <div className="text-sm text-gray-500 mb-2">Startups added (last 6 months)</div>
      <ReactApexChart options={options} series={series} type="bar" height={280} />
    </div>
  );
};

export default AdminCharts;

