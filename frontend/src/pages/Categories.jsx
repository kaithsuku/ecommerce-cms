import { Edit3, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await api.categories();
      setCategories(response.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, form);
      } else {
        await api.createCategory(form);
      }
      setForm({ name: "", description: "" });
      setEditingCategory(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || ""
    });
  }

  function cancelEdit() {
    setEditingCategory(null);
    setForm({ name: "", description: "" });
  }

  async function removeCategory(id) {
    try {
      await api.deleteCategory(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Structure</span>
          <h1>Categories</h1>
        </div>
        <p>Organize the catalog into clean buying paths.</p>
      </header>

      <form className="form-panel compact" onSubmit={submit}>
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Apparel"
          />
        </label>
        <label>
          Description
          <input
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Clothing and accessories"
          />
        </label>
        {editingCategory ? (
          <button className="ghost-button" type="button" onClick={cancelEdit}>
            <X size={17} />
            <span>Cancel</span>
          </button>
        ) : null}
        <button className="primary-button" type="submit">
          <Save size={17} />
          <span>{editingCategory ? "Save category" : "Add category"}</span>
        </button>
      </form>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="category-list">
        {categories.map((category) => (
          <article key={category.id} className="category-row">
            <div>
              <strong>{category.name}</strong>
              <span>{category.description || "No description"}</span>
            </div>
            <div className="row-actions">
              <button className="icon-button" onClick={() => startEdit(category)} type="button">
                <Edit3 size={16} />
              </button>
              <button className="icon-button danger" onClick={() => removeCategory(category.id)} type="button">
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
