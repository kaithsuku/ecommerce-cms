import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { StatCard } from "../components/StatCard.jsx";

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .stats()
      .then((response) => setStats(response.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Control room</span>
          <h1>Dashboard</h1>
        </div>
        <p>Catalog health, stock pressure, and order movement at a glance.</p>
      </header>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="stats-grid">
        <StatCard label="Total products" value={stats?.totalProducts ?? "-"} />
        <StatCard label="Active products" value={stats?.activeProducts ?? "-"} tone="green" />
        <StatCard label="Low stock" value={stats?.lowStockProducts ?? "-"} tone="amber" />
        <StatCard label="Out of stock" value={stats?.outOfStockProducts ?? "-"} tone="red" />
        <StatCard label="Pending orders" value={stats?.pendingOrders ?? "-"} />
        <StatCard
          label="Tracked revenue"
          value={stats ? `$${Number(stats.revenue).toFixed(2)}` : "-"}
          tone="ink"
        />
      </div>
    </section>
  );
}

