// MOCK API - Replace with actual API calls using a library like axios.
// This file simulates fetching data from your backend.

// A mock function to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface DashboardSummary {
  todaysRevenue: number;
  revenueChange: number;
  ordersToday: number;
  ordersChange: number;
  activeOrders: number;
  avgOrderValue: number;
  avgOrderValueChange: number;
}

export interface RevenueDataPoint {
  name: string;
  revenue: number;
}

export interface OrdersDataPoint {
  hour: string;
  orders: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  revenueOverTime: RevenueDataPoint[];
  ordersByHour: OrdersDataPoint[];
}

// Mock data that matches the structure of the old static data
const mockRevenueData: RevenueDataPoint[] = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const mockOrdersData: OrdersDataPoint[] = [
  { hour: '09:00', orders: 4 },
  { hour: '10:00', orders: 7 },
  { hour: '11:00', orders: 12 },
  { hour: '12:00', orders: 25 },
  { hour: '13:00', orders: 30 },
  { hour: '14:00', orders: 22 },
  { hour: '15:00', orders: 18 },
  { hour: '16:00', orders: 21 },
  { hour: '17:00', orders: 28 },
  { hour: '18:00', orders: 35 },
  { hour: '19:00', orders: 40 },
  { hour: '20:00', orders: 32 },
];

const mockSummaryData: DashboardSummary = {
  todaysRevenue: 1250.5,
  revenueChange: 10.2,
  ordersToday: 75,
  ordersChange: 12,
  activeOrders: 12,
  avgOrderValue: 16.67,
  avgOrderValueChange: 5,
};

/**
 * Fetches all dashboard data in a single call.
 * In a real app, this would make a GET request to an endpoint like `/api/analytics/dashboard`.
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  console.log('Fetching dashboard data...');
  await sleep(1500); // Simulate network delay

  // To simulate a potential error, uncomment the following lines:
  // if (Math.random() > 0.8) {
  //   throw new Error("Failed to fetch dashboard data.");
  // }

  return {
    summary: mockSummaryData,
    revenueOverTime: mockRevenueData,
    ordersByHour: mockOrdersData,
  };
};

// --- Order Management ---

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // Price per item
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 'order-1',
    tableNumber: 5,
    items: [
      { id: 'item-1', name: 'Espresso', quantity: 2, price: 3.5 },
      { id: 'item-2', name: 'Croissant', quantity: 1, price: 2.75 },
    ],
    total: 9.75,
    status: 'PENDING',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-2',
    tableNumber: 2,
    items: [
      { id: 'item-3', name: 'Latte', quantity: 1, price: 4.5 },
      { id: 'item-4', name: 'Muffin', quantity: 1, price: 3.0 },
    ],
    total: 7.5,
    status: 'PREPARING',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-3',
    tableNumber: 8,
    items: [{ id: 'item-5', name: 'Iced Tea', quantity: 1, price: 3.0 }],
    total: 3.0,
    status: 'READY',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
];

/**
 * Fetches all active (non-completed) orders.
 * In a real app, this would make a GET request to an endpoint like `/api/orders?status=active`.
 */
export const getActiveOrders = async (): Promise<Order[]> => {
  console.log('Fetching active orders...');
  await sleep(1000);
  // Return a deep copy to prevent mutation of the mock data source
  return JSON.parse(JSON.stringify(mockOrders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED')));
};