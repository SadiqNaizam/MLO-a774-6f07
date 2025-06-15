import React from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays } from 'lucide-react';

const chartData = [
  { name: 'March', closedWon: 65, closedLost: 42 },
  { name: 'April', closedWon: 52, closedLost: 30 },
  { name: 'May', closedWon: 88, closedLost: 45 },
  { name: 'June', closedWon: 60, closedLost: 12 },
  { name: 'July', closedWon: 75, closedLost: 40 },
  { name: 'August', closedWon: 105, closedLost: 25 },
];

interface LineChartCardProps {
  className?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = React.useState<string>('leadsConverted');

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
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
            <div className="text-sm mt-1">
              <span className="text-2xl font-bold text-foreground">680</span>
              <span className="ml-1 text-muted-foreground">total closed</span>
              <span className="text-2xl font-bold text-foreground ml-4">70</span>
              <span className="ml-1 text-muted-foreground">total lost</span>
            </div>
          </div>
          <TimeRangeSelect />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickLine={false} axisLine={false} dx={-5} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))', 
                  borderRadius: 'var(--radius)' 
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="closedWon" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, strokeWidth: 2, fill: '#14b8a6' }} activeDot={{ r: 6, fill: '#14b8a6', stroke: 'hsl(var(--card))' }} name="Closed Won" />
              <Area type="monotone" dataKey="closedLost" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, strokeWidth: 2, fill: '#ef4444' }} activeDot={{ r: 6, fill: '#ef4444', stroke: 'hsl(var(--card))' }} name="Closed Lost" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-start space-x-4 mt-4 mb-2 border-b border-border pb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2 bg-[#14b8a6]"></div>
              <span className="text-sm text-muted-foreground">Closed won</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2 bg-[#ef4444]"></div>
              <span className="text-sm text-muted-foreground">Closed lost</span>
            </div>
        </div>
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary p-1 h-auto">
            <TabsTrigger value="leadsCame" className="text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize" className="text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
