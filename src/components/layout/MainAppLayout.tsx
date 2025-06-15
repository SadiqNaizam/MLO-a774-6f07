import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div
      className={cn(
        'grid h-screen bg-background', // Overall container using CSS Grid and taking full screen height
        'grid-cols-[auto_1fr]',      // Defines two columns: 
                                     // 1st column ('auto'): width determined by Sidebar content (w-64).
                                     // 2nd column ('1fr'): takes the remaining available width.
        'grid-rows-[auto_1fr]'       // Defines two rows:
                                     // 1st row ('auto'): height determined by Header content (h-16).
                                     // 2nd row ('1fr'): takes the remaining available height.
      )}
    >
      {/* Sidebar Area */}
      {/* This div occupies the first column and spans both rows. */}
      {/* A right border is added to visually separate Sidebar from Header/Main Content. */}
      <div className="row-span-2 border-r border-border">
        <Sidebar />
      </div>

      {/* Header Area */}
      {/* This div occupies the first row of the second column. */}
      {/* The TopHeader component within Header handles its own sticky behavior. */}
      <div>
        <Header />
      </div>

      {/* Main Content Area */}
      {/* This main element occupies the second row of the second column. */}
      {/* 'overflow-y-auto' enables scrolling for content that exceeds available vertical space. */}
      <main className="overflow-y-auto">
        {/* An inner div provides padding for the content rendered via {children}. */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
