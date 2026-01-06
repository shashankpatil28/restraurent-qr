export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="card">Revenue</div>
      <div className="card">Orders</div>
      <div className="card">Clients</div>
      <div className="card">Avg Value</div>

      <div className="card col-span-2 h-64">Revenue Chart</div>
      <div className="card col-span-2 h-64">Orders Chart</div>
    </div>
  );
}
