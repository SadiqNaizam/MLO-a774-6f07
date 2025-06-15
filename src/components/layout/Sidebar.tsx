import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn("h-full", className)}>
      {/* 
        The SidebarNav component (from context code) is styled with 'fixed' positioning.
        To integrate it into this CSS Grid-based MainAppLayout, we override 'fixed' with '!static'.
        The 'h-full' class ensures SidebarNav takes the full height of this container,
        which is itself sized by the parent grid cell (spanning two rows).
        SidebarNav is responsible for its own width (w-64) and internal content arrangement.
      */}
      <SidebarNav className="!static h-full" />
    </div>
  );
};

export default Sidebar;
