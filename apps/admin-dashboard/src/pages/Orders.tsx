import { useEffect, useState, useMemo } from 'react';
import { getActiveOrders, Order, OrderStatus } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderCard } from '@/components/OrderCard';
import { useSocket } from '@/contexts/SocketContext';
import { sendOrderStatusUpdate } from '@/services/socket';

// Define the order of statuses for the Kanban board
const KANBAN_STATUSES: OrderStatus[] = ['PENDING', 'PREPARING', 'READY'];

const statusTitles: Record<OrderStatus, string> = {
  PENDING: 'New Orders',
  PREPARING: 'In the Kitchen',
  READY: 'Ready for Pickup',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { lastMessage, sendMessage } = useSocket();

  // Fetch initial orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const initialOrders = await getActiveOrders();
        setOrders(initialOrders);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Listen for real-time updates from the WebSocket
  useEffect(() => {
    if (lastMessage) {
      const { type, payload } = lastMessage;

      if (type === 'NEW_ORDER') {
        // Add the new order to the list, avoiding duplicates
        setOrders(prevOrders => {
          if (prevOrders.some(o => o.id === payload.id)) {
            return prevOrders;
          }
          return [payload, ...prevOrders];
        });
      }

      if (type === 'ORDER_STATUS_UPDATE') {
        // Update the status of an existing order
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === payload.id ? { ...order, status: payload.status } : order
          )
        );
      }
    }
  }, [lastMessage]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // Optimistically update the UI
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // Send the update to the server via WebSocket
    sendOrderStatusUpdate(sendMessage, orderId, newStatus);
  };

  const ordersByStatus = useMemo(() => {
    const grouped: Record<string, Order[]> = {};
    KANBAN_STATUSES.forEach(status => {
      grouped[status] = orders
        .filter(order => order.status === status)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    });
    return grouped;
  }, [orders]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-4 md:p-6">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Live Orders</h1>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 overflow-x-auto bg-muted/20">
        {loading ? (
          KANBAN_STATUSES.map(status => <OrderColumnSkeleton key={status} />)
        ) : (
          KANBAN_STATUSES.map(status => (
            <div key={status} className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg h-full">
              <h2 className="font-bold text-lg px-2">{statusTitles[status]} ({ordersByStatus[status]?.length || 0})</h2>
              <div className="flex flex-col gap-4 overflow-y-auto p-1 -m-1">
                {ordersByStatus[status]?.length > 0 ? (
                  ordersByStatus[status].map(order => (
                    <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[100px] text-sm text-muted-foreground rounded-md border-2 border-dashed">
                    No orders
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const OrderColumnSkeleton = () => (
  <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg">
    <Skeleton className="h-7 w-3/5" />
    <div className="flex flex-col gap-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  </div>
);
