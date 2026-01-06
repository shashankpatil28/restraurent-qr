import { NavLink } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/orders', label: 'Orders' },
  { to: '/menu', label: 'Menu' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/tables', label: 'Tables & QR' },
  { to: '/receipts', label: 'Receipts' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface border-r border-border px-4 py-6">
      <h1 className="text-xl font-bold text-primary mb-8">
        Café Admin
      </h1>

      <nav className="space-y-2">
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-textMuted hover:bg-orange-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
