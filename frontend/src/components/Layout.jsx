import {
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  FolderTree,
  LogOut
} from "lucide-react";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { id: "products", label: "Products", icon: Boxes },
  { id: "categories", label: "Categories", icon: FolderTree },
  { id: "orders", label: "Orders", icon: ClipboardList }
];

export function Layout({ activePage, onNavigate, onLogout, children }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">EC</span>
          <div>
            <strong>Editorial Commerce</strong>
            <span>Store operations CMS</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activePage === item.id ? "nav-item active" : "nav-item"}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logout-button" onClick={onLogout} type="button">
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}

