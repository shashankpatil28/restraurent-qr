import { LayoutDashboard, UtensilsCrossed, ClipboardList, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Live Orders", path: "/admin/orders" },
  { icon: UtensilsCrossed, label: "Menu Editor", path: "/admin/menu" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: ClipboardList, label: "Table QR Management", path: "/admin/tables" },
];

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col p-4 shadow-depth">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
          <UtensilsCrossed className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-brand-dark tracking-tight">Cafe Chokolade</span>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-brand-dark rounded-xl transition-all duration-200 font-medium"
          >
            <item.icon size={20} />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};