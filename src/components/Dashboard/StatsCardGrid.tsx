import React from 'react';
import { cn } from '@/lib/utils';
import { StatCard } from './StatCard';
import { PieChart as CustomPieChart } from './PieChart'; // Renamed to avoid conflict if StatCard also had PieChart
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string;
  progress: number; 
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-red-500', progress: 33.33 },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-yellow-400', progress: 16.67 },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 0 /* average time note here */, color: 'bg-indigo-500', progress: 8.33 },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-500', progress: 3.33 },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-500', progress: 3.33 },
];

const pieChartData = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#ef4444' }, 
  { name: 'Behance', value: 1000, percentage: 20, color: '#f59e0b' }, // Adjusted percentages to sum to 100
  { name: 'Instagram', value: 1000, percentage: 15, color: '#14b8a6' },
  { name: 'Dribbble', value: 1000, percentage: 15, color: '#84cc16' },
];

const StatsCardGrid: React.FC = () => {
  const totalFunnelProgress = funnelData.reduce((sum, stage) => sum + stage.progress, 0);

  const TimeRangeSelect = () => (
    <Select defaultValue="last-6-months">
      <SelectTrigger className="w-auto h-8 text-xs text-muted-foreground border-none shadow-none bg-transparent focus:ring-0 focus:ring-offset-0">
        <CalendarDays className="h-4 w-4 mr-1" />
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="last-6-months">last 6 months</SelectItem>
        <SelectItem value="last-3-months">last 3 months</SelectItem>
        <SelectItem value="last-month">last month</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Funnel Count Card */}
      <StatCard title="Funnel count">
        <div className="mb-4">
          <span className="text-4xl font-bold">600</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>
        <div className="w-full h-3 rounded-full flex overflow-hidden mb-6 bg-gray-200">
          {funnelData.map(stage => (
            <div key={stage.id} className={cn(stage.color, 'h-full')} style={{ width: `${stage.progress}%` }}></div>
          ))}
        </div>
        
        <ul className="space-y-3 text-sm">
          {funnelData.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)}></div>
              <span className="text-foreground whitespace-nowrap">{stage.name}</span>
              <span className="text-muted-foreground text-right">{stage.count}</span>
              <span className="text-muted-foreground text-right">${stage.value}</span>
              <span className="col-start-4 text-right text-muted-foreground">
                {stage.name === 'Qualified' ? (
                  <div className="flex items-center justify-end">
                    <span>{stage.days} days</span>
                    <Badge variant="secondary" className="ml-2 text-xs h-auto py-0.5 px-1.5 bg-gray-700 text-white">average time on this stage</Badge>
                  </div>
                ) : (
                  <span>{stage.days} days</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </StatCard>

      {/* Sources Card */}
      <StatCard title="Sources" headerActions={<TimeRangeSelect />}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-full md:w-1/2 h-56">
            <CustomPieChart data={pieChartData} />
          </div>
          <div className="w-full md:w-1/2 space-y-2 text-sm">
            {pieChartData.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: source.color }}></div>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-foreground font-medium">${source.value}</span>
                  <span className="text-muted-foreground ml-2">{source.percentage}%</span>
                </div>
              </div>
            ))}
            <div className="text-right mt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-muted-foreground cursor-default flex items-center justify-end">
                    from leads total <Info className="ml-1 h-3 w-3" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Values are based on total leads generated.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </StatCard>
    </div>
    </TooltipProvider>
  );
};

export default StatsCardGrid;
