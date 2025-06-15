import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import LineChartCard from '../components/Dashboard/LineChart';
import DataSummary from '../components/Dashboard/DataSummary';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout provides a main content area with p-6 padding.
        This div arranges the major dashboard sections vertically with a consistent gap.
        Each section (StatsCardGrid, LineChartCard, DataSummary) is a self-contained organism
        responsible for its own internal layout and data as per the provided context components.
      */}
      <div className="space-y-6">
        <StatsCardGrid />
        <LineChartCard />
        <DataSummary />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
