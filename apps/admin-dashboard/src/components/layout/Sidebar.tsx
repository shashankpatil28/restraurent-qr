import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, BarChart3, Table2, Receipt, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Live Orders', path: '/orders', icon: ClipboardList },
  { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Tables & QR', path: '/tables', icon: Table2 },
  { name: 'Receipts', path: '/receipts', icon: Receipt },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">QR</div>
          <span className="text-card-foreground">RestoAdmin</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm" 
                : ""
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}