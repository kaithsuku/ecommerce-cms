import { Save } from "lucide-react";
import { useEffect, useState } from "react";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  stock: "",
  status: "active",
  image_url: "",
  category_id: ""
};

export function ProductForm({ categories, editingProduct, error, submitLabel, onSubmit, onCancel }) {
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    setProduct(editingProduct || emptyProduct);
  }, [editingProduct]);

  function update(field, value) {
    setProduct((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const saved = await onSubmit({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock)
    });
    if (saved !== false) {
      setProduct(emptyProduct);
    }
  }

  return (
    <form className="dialog-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Product name
          <input
            required
            value={product.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Washed cotton overshirt"
          />
        </label>
        <label>
          Category
          <select
            value={product.category_id || ""}
            onChange={(event) => update("category_id", event.target.value)}
          >
            <option value="">Unassigned</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price
          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={product.price}
            onChange={(event) => update("price", event.target.value)}
          />
        </label>
        <label>
          Stock
          <input
            required
            min="0"
            type="number"
            value={product.stock}
            onChange={(event) => update("stock", event.target.value)}
          />
        </label>
        <label>
          Status
          <select value={product.status} onChange={(event) => update("status", event.target.value)}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label>
          Image URL
          <input
            value={product.image_url || ""}
            onChange={(event) => update("image_url", event.target.value)}
            placeholder="https://..."
          />
        </label>
      </div>

      <label>
        Description
        <textarea
          value={product.description || ""}
          onChange={(event) => update("description", event.target.value)}
          rows="3"
        />
      </label>

      {error ? <p className="error-text dialog-error">{error}</p> : null}

      <div className="dialog-actions">
        {editingProduct ? (
          <button className="ghost-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button className="primary-button" type="submit">
          <Save size={17} />
          <span>{submitLabel || (editingProduct ? "Save product" : "Add product")}</span>
        </button>
      </div>
    </form>
  );
}
