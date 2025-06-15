import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  Briefcase,
  FileText,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Box,
  Menu as MenuIcon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '#', label: 'Dashboard', icon: LayoutGrid },
  { href: '#', label: 'Leads', icon: Users },
  { href: '#', label: 'Customers', icon: Users }, // Using Users again as per image proximity
  { href: '#', label: 'Proposals', icon: Briefcase },
  { href: '#', label: 'Invoices', icon: FileText },
  { href: '#', label: 'Items', icon: ShoppingCart },
  { href: '#', label: 'Mail', icon: Mail },
  { href: '#', label: 'Shoebox', icon: Archive },
  { href: '#', label: 'Calendar', icon: CalendarDays },
];

const secondaryNavItems: NavItem[] = [
  { href: '#', label: 'Help', icon: HelpCircle },
  { href: '#', label: 'Settings', icon: Settings },
  { href: '#', label: 'Help', icon: HelpCircle }, // Duplicated Help as per image
];

interface SidebarNavProps {
  className?: string;
  activePath?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className, activePath = '#' }) => {
  // In a real app, activePath would come from routing context
  const currentPath = activePath; 

  const renderNavList = (items: NavItem[], isSecondary: boolean = false) => (
    <ul className={cn('space-y-1', isSecondary && 'mt-auto pt-4 border-t border-sidebar-border')}>
      {items.map((item) => {
        const isActive = item.href === currentPath && item.label === 'Dashboard'; // Hardcoding Dashboard as active for now
        return (
          <li key={item.label}>
            <a
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground flex flex-col p-4 space-y-6 fixed h-full', className)}>
      <div className="flex items-center justify-between h-16 px-0 border-b border-sidebar-border mb-0 pb-4">
        <div className="flex items-center">
          <Box className="h-8 w-8 mr-2 text-primary" /> 
          <span className="font-semibold text-xl text-foreground">bo</span>
        </div>
        <button className="text-sidebar-foreground hover:text-sidebar-accent-foreground">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow flex flex-col overflow-y-auto">
        {renderNavList(mainNavItems)}
        {renderNavList(secondaryNavItems, true)}
      </nav>
    </aside>
  );
};

export default SidebarNav;
