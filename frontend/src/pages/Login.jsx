import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { api } from "../api/client.js";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.login({ email, password });
      onLogin(response.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-copy">
        <span className="eyebrow">Commerce operations</span>
        <h1>Manage the catalog before it reaches the customer.</h1>
        <p>
          A focused CMS for products, stock, categories, and order movement.
          Built for the operator who needs clean information fast.
        </p>
      </section>

      <form className="login-form" onSubmit={submit}>
        <div>
          <span className="eyebrow">Admin access</span>
          <h2>Sign in</h2>
        </div>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="primary-button wide" type="submit" disabled={loading}>
          <span>{loading ? "Checking..." : "Enter CMS"}</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </main>
  );
}

