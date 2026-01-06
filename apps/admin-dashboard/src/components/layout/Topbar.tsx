export default function Topbar() {
  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
      <span className="text-sm text-textMuted">
        Welcome back 👋
      </span>

      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-sm">Live</span>
      </div>
    </header>
  );
}
