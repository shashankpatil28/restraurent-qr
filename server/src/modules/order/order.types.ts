export interface OrderItemInput {
  menuItemId: string;
  qty: number;
}

export interface CreateOrderInput {
  tableId: string;
  items: OrderItemInput[];
}

export interface UpdateOrderStatusInput {
  status: 'PREPARING' | 'SERVED' | 'PAID' | 'CANCELLED';
}
