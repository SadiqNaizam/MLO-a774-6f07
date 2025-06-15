import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ReasonItem {
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonItem[] = [
  { percentage: 40, description: 'The proposal is unclear' },
  { percentage: 20, description: 'However venture pursuit' },
  { percentage: 10, description: 'Other' },
  { percentage: 30, description: 'The proposal is unclear' }, // Duplicated as per image
];

interface OtherDataItem {
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataItems: OtherDataItem[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads with no activity in the last 30 days.' },
];

const DataSummary: React.FC = () => {
  return (
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6">
          {reasonsLostData.map((reason, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          {/* Title "Other data" is implicit from image layout, can be added if needed */}
          <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle> 
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherDataItems.map((item, index) => (
            <div key={index} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
              <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start">
                <span>{item.label}</span>
                {item.hasInfo && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.infoText}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};

export default DataSummary;
