import { Bell, Wifi, WifiOff } from 'lucide-react';
import { useSocket } from '@/contexts/SocketContext';

export default function Topbar() {
  const { isConnected } = useSocket();

  return (
    <header className="h-16 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
      <h1 className="text-lg font-semibold text-card-foreground">Admin Panel</h1>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-600">Live Connection</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-500" />
              <span className="text-xs font-medium text-gray-600">Disconnected</span>
            </>
          )}
        </div>

        <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">The Golden Grill</p>
            <p className="text-xs text-muted-foreground">Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
            GG
          </div>
        </div>
      </div>
    </header>
  );
}