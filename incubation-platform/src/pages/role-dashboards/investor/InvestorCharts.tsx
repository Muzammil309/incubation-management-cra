import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactApexChart from 'react-apexcharts';

interface InvestorChartsProps {
  deals: any[] | undefined;
}

const InvestorCharts: React.FC<InvestorChartsProps> = ({ deals }) => {
  // Simple pie: deals by stage
  const byStage = new Map<string, number>();
  (deals ?? []).forEach((d: any) => {
    const stage = (d.stage || 'Unknown') as string;
    byStage.set(stage, (byStage.get(stage) || 0) + 1);
  });
  const labels = Array.from(byStage.keys());
  const series = labels.map((l) => byStage.get(l) || 0);

  const options = {
    labels,
    legend: { position: 'bottom' },
    theme: { mode: 'light' },
  } as any;

  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
      <div className="text-sm text-gray-500 mb-2">Deals by stage</div>
      <ReactApexChart options={options} series={series} type="donut" height={280} />
    </div>
  );
};

export default InvestorCharts;

