import { useEffect, useState } from "react";
import { api } from "../api/client.js";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await api.orders();
      setOrders(response.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id, status) {
    try {
      await api.updateOrderStatus(id, status);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Fulfillment</span>
          <h1>Orders</h1>
        </div>
        <p>Move orders through simple operational states.</p>
      </header>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.customer_name}</strong>
                  <span>{order.customer_email}</span>
                </td>
                <td>{order.order_items?.length || 0}</td>
                <td>${Number(order.total_amount).toFixed(2)}</td>
                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

