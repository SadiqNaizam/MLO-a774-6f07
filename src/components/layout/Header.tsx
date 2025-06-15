import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // The TopHeader component (from context code) defines its own height (h-16),
  // sticky positioning, background, border, and internal layout.
  // This Header component acts as a designated slot within the MainAppLayout's grid structure.
  return (
    <div className={cn(className)}>
      <TopHeader />
    </div>
  );
};

export default Header;
