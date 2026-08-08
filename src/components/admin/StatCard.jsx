export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="border border-border/50 rounded p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <span className="font-body text-xs tracking-label uppercase text-muted-foreground">{label}</span>
        {Icon && <Icon size={18} className="text-accent" />}
      </div>
      <p className="font-display text-3xl font-light">{value}</p>
    </div>
  );
}