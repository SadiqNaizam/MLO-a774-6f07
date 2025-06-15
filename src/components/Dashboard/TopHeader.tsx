import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  return (
    <header 
      className={cn(
        'sticky top-0 z-40 bg-background border-b border-border h-16 flex items-center justify-between px-6',
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-1">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="sales" 
              className="text-sm data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-1 pb-1.5 mr-4 text-muted-foreground"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger 
              value="leads" 
              className="text-sm data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-1 pb-1.5 text-muted-foreground"
            >
              Leads
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>New Lead</DropdownMenuItem>
          <DropdownMenuItem>New Customer</DropdownMenuItem>
          <DropdownMenuItem>New Proposal</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopHeader;
