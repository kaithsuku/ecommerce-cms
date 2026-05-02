import { useEffect, useState } from "react";
import { Layout } from "./components/Layout.jsx";
import { Categories } from "./pages/Categories.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Login } from "./pages/Login.jsx";
import { Orders } from "./pages/Orders.jsx";
import { Products } from "./pages/Products.jsx";

export function App() {
  const [token, setToken] = useState(() => localStorage.getItem("cms_token"));
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    if (token) {
      localStorage.setItem("cms_token", token);
    } else {
      localStorage.removeItem("cms_token");
    }
  }, [token]);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  const page = {
    dashboard: <Dashboard />,
    products: <Products />,
    categories: <Categories />,
    orders: <Orders />
  }[activePage];

  return (
    <Layout
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={() => setToken(null)}
    >
      {page}
    </Layout>
  );
}

