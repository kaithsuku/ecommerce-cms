import { Edit3, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { ProductForm } from "../components/ProductForm.jsx";

export function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({ search: "", category_id: "", status: "", stock: "" });
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        api.products(filters),
        api.categories()
      ]);
      setProducts(productResponse.data || []);
      setCategories(categoryResponse.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, [filters.search, filters.category_id, filters.status, filters.stock]);

  async function saveProduct(product) {
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, product);
      } else {
        await api.createProduct(product);
      }
      setEditingProduct(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeProduct(id) {
    try {
      await api.deleteProduct(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1>Products</h1>
        </div>
        <p>Keep product content, pricing, stock, and publish status in one place.</p>
      </header>

      <ProductForm
        categories={categories}
        editingProduct={editingProduct}
        onSubmit={saveProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <div className="toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            placeholder="Search products"
          />
        </label>
        <select
          value={filters.category_id}
          onChange={(event) => setFilters({ ...filters, category_id: event.target.value })}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(event) => setFilters({ ...filters, status: event.target.value })}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={filters.stock}
          onChange={(event) => setFilters({ ...filters, stock: event.target.value })}
        >
          <option value="">All stock</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.name}</strong>
                  <span>{product.description || "No description"}</span>
                </td>
                <td>{product.categories?.name || "Unassigned"}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`pill ${product.status}`}>{product.status}</span>
                </td>
                <td className="row-actions">
                  <button className="icon-button" onClick={() => setEditingProduct(product)} type="button">
                    <Edit3 size={16} />
                  </button>
                  <button className="icon-button danger" onClick={() => removeProduct(product.id)} type="button">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

