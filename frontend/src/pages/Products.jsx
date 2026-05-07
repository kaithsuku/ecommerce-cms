import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { ConfirmDialog, Dialog } from "../components/Dialog.jsx";
import { ProductForm } from "../components/ProductForm.jsx";

export function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDialogMode, setProductDialogMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filters, setFilters] = useState({ search: "", category_id: "", status: "", stock: "" });
  const [error, setError] = useState("");
  const [dialogError, setDialogError] = useState("");

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

  function openCreateDialog() {
    setDialogError("");
    setSelectedProduct(null);
    setProductDialogMode("create");
  }

  function openEditDialog(product) {
    setDialogError("");
    setSelectedProduct(product);
    setProductDialogMode("edit");
  }

  function closeProductDialog() {
    setDialogError("");
    setSelectedProduct(null);
    setProductDialogMode(null);
  }

  function openDeleteDialog(product) {
    setDialogError("");
    setProductToDelete(product);
  }

  async function saveProduct(product) {
    setDialogError("");
    try {
      if (selectedProduct) {
        await api.updateProduct(selectedProduct.id, product);
      } else {
        await api.createProduct(product);
      }
      closeProductDialog();
      await load();
      return true;
    } catch (err) {
      setDialogError(err.message);
      return false;
    }
  }

  async function confirmDeleteProduct() {
    if (!productToDelete) {
      return;
    }

    setDialogError("");
    try {
      await api.deleteProduct(productToDelete.id);
      setProductToDelete(null);
      await load();
    } catch (err) {
      setDialogError(err.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1>Products</h1>
        </div>
        <div className="page-header-actions">
          <p>Keep product content, pricing, stock, and publish status in one place.</p>
          <button className="primary-button" type="button" onClick={openCreateDialog}>
            <Plus size={17} />
            <span>Add product</span>
          </button>
        </div>
      </header>

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
                  <button className="icon-button" onClick={() => openEditDialog(product)} type="button" aria-label={`Edit ${product.name}`}>
                    <Edit3 size={16} />
                  </button>
                  <button className="icon-button danger" onClick={() => openDeleteDialog(product)} type="button" aria-label={`Delete ${product.name}`}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={Boolean(productDialogMode)}
        title={productDialogMode === "edit" ? "Edit product" : "Add product"}
        description="Manage catalog content, pricing, inventory, and publish state."
        onClose={closeProductDialog}
        size="lg"
      >
        <ProductForm
          categories={categories}
          editingProduct={selectedProduct}
          error={dialogError}
          submitLabel={productDialogMode === "edit" ? "Save product" : "Add product"}
          onSubmit={saveProduct}
          onCancel={closeProductDialog}
        />
      </Dialog>

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="Delete product?"
        description={`Delete "${productToDelete?.name || "this product"}"? This action cannot be undone.`}
        confirmLabel="Delete product"
        error={dialogError}
        onCancel={() => {
          setDialogError("");
          setProductToDelete(null);
        }}
        onConfirm={confirmDeleteProduct}
      />
    </section>
  );
}
