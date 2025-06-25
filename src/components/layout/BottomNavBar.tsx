import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, PiggyBank, History, User } from 'lucide-react';

const navItems = [
  { href: '/dashboard-screen', label: 'Dashboard', icon: LayoutGrid },
  { href: '/savings-screen', label: 'Savings', icon: PiggyBank },
  { href: '/activity-screen', label: 'Activity', icon: History },
  // NOTE: The 'Profile' link points to the dashboard as a placeholder,
  // since a dedicated '/profile' route does not exist in App.tsx.
  { href: '/dashboard-screen', label: 'Profile', icon: User },
];

const BottomNavBar: React.FC = () => {
  console.log('BottomNavBar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
      isActive
        ? 'text-primary'
        : 'text-muted-foreground hover:text-primary/80'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container grid h-full grid-cols-4 items-center justify-items-center px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={navLinkClasses}
            end={item.href === '/dashboard-screen'} // Use end prop for parent routes to avoid multiple active links
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;