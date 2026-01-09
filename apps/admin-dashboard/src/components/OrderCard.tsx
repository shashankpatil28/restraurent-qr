import { Order, OrderStatus } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)}y ago`;
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)}mo ago`;
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)}d ago`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)}h ago`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)}m ago`;
  return `${Math.floor(seconds)}s ago`;
};

const getNextStatus = (currentStatus: OrderStatus): { status: OrderStatus; label: string } | null => {
  switch (currentStatus) {
    case 'PENDING':
      return { status: 'PREPARING', label: 'Start Preparing' };
    case 'PREPARING':
      return { status: 'READY', label: 'Mark as Ready' };
    case 'READY':
      return { status: 'COMPLETED', label: 'Complete Order' };
    default:
      return null;
  }
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const nextAction = getNextStatus(order.status);

  return (
    <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-base font-bold">Table {order.tableNumber}</CardTitle>
        <div className="text-xs text-muted-foreground">{timeAgo(order.createdAt)}</div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1 my-2 border-t border-b py-2">
          {order.items.map(item => (
            <li key={item.id} className="flex justify-between text-muted-foreground">
              <span>{item.quantity}x {item.name}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2 flex justify-between items-center font-bold">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
        {nextAction && (
          <Button className="w-full mt-4" size="sm" onClick={() => onStatusChange(order.id, nextAction.status)}>
            {nextAction.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}