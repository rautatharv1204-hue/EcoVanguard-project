import React, { useState } from 'react';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import GridCarbonOverlayChart from '../components/analytics/GridCarbonOverlayChart';
import ZoneEnergyBarChart from '../components/analytics/ZoneEnergyBarChart';
import OccupancyEfficiencyGauge from '../components/analytics/OccupancyEfficiencyGauge';
import ExecutiveSummary from '../components/analytics/ExecutiveSummary';
import { hourly24HourData, weeklyData, monthlyData } from '../data/mockData';
import { ArrowLeft, RefreshCw, BarChart2, ShieldCheck, Download } from 'lucide-react';

export default function AnalyticsPage({
  isAcShutdownActive,
  setIsAcShutdownActive,
  onTriggerToast,
  onBackToOverview
}) {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedZone, setSelectedZone] = useState('all');
  const [emissionThreshold, setEmissionThreshold] = useState(350);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Format data based on selected timeRange
  const chartData = timeRange === '24h' 
    ? hourly24HourData 
    : timeRange === '7d' 
      ? weeklyData.map(d => ({
          timeLabel: d.day,
          hour: d.day,
          gridRate: d.avgRate,
          carbonIntensity: d.avgCarbon,
          totalLoadKw: d.peakLoadKw,
          isOffPeak: d.avgRate < 0.16
        }))
      : monthlyData.map(d => ({
          timeLabel: d.interval,
          hour: d.interval,
          gridRate: d.avgRate,
          carbonIntensity: d.avgCarbon,
          totalLoadKw: d.peakLoadKw,
          isOffPeak: d.avgRate < 0.16
        }));

  // Count how many intervals exceed the emissionThreshold
  const exceededHoursCount = chartData.filter(d => d.carbonIntensity > emissionThreshold).length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast({
        type: 'info',
        title: 'Telemetry Buffers Synchronized',
        message: 'Refreshed 1-second sub-meter streams & WattTime MOER forecasts.',
        metric: 'Data Freshness < 1s'
      });
    }, 600);
  };

  const handleExportCsv = () => {
    // Generate CSV string
    const headers = "Interval,Time,GridRate_USD_kWh,CarbonIntensity_gCO2eq_kWh,FacilityLoad_kW,TariffStatus\n";
    const rows = chartData.map(d => 
      `"${d.timeLabel}","${d.hour}",${d.gridRate.toFixed(2)},${d.carbonIntensity},${d.totalLoadKw},"${d.isOffPeak ? 'Off-Peak' : 'On-Peak'}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ecovanguard_energy_carbon_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onTriggerToast({
      type: 'success',
      title: 'Analytics Export Complete',
      message: `Downloaded CSV dataset for ${timeRange.toUpperCase()} time range.`,
      metric: 'Ready for ESG Audit'
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Analytics Page Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8F0EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-[#1E3F20] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to System Overview</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-[#E8F0EC] text-[#1E3F20]">
              <BarChart2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E18] tracking-tight">
              Deep-Dive Data Analytics Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Granular multi-dimensional energy profiling, marginal carbon correlation curves, zone-level power disaggregation, and automated facility efficiency scoring.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all ${
              isRefreshing ? 'animate-spin text-[#1E3F20]' : ''
            }`}
            title="Refresh Live Data Feeds"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1E3F20] hover:bg-[#162E18] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-[#A3E635]" />
            <span>Export ESG Report</span>
          </button>
        </div>
      </div>

      {/* 1. Filter Controls Ribbon */}
      <AnalyticsFilters 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        emissionThreshold={emissionThreshold}
        setEmissionThreshold={setEmissionThreshold}
        exceededHoursCount={exceededHoursCount}
        onExportReport={handleExportCsv}
      />

      {/* 2. Interactive Line/Area Chart: 24h Grid Rate vs Carbon Intensity Overlay */}
      <GridCarbonOverlayChart 
        data={chartData} 
        emissionThreshold={emissionThreshold} 
      />

      {/* 3. Bar Chart: Zone-by-Zone Energy Consumption (Baseline vs Peak) */}
      <ZoneEnergyBarChart 
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
      />

      {/* 4. Donut / Radial Gauge: Real-time Floor Occupancy vs. Power Efficiency */}
      <OccupancyEfficiencyGauge 
        isAcShutdownActive={isAcShutdownActive} 
      />

      {/* 5. Executive Conclusion & Impact Summary with Actionable Recommendations */}
      <ExecutiveSummary 
        onTriggerToast={onTriggerToast}
        setIsAcShutdownActive={setIsAcShutdownActive}
      />

    </div>
  );
}
