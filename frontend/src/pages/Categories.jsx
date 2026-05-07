import { Edit3, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { ConfirmDialog, Dialog } from "../components/Dialog.jsx";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [categoryDialogMode, setCategoryDialogMode] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [error, setError] = useState("");
  const [dialogError, setDialogError] = useState("");

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

  function openCreateDialog() {
    setDialogError("");
    setEditingCategory(null);
    setForm({ name: "", description: "" });
    setCategoryDialogMode("create");
  }

  function openEditDialog(category) {
    setDialogError("");
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || ""
    });
    setCategoryDialogMode("edit");
  }

  function closeCategoryDialog() {
    setDialogError("");
    setEditingCategory(null);
    setForm({ name: "", description: "" });
    setCategoryDialogMode(null);
  }

  async function submit(event) {
    event.preventDefault();
    setDialogError("");
    try {
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, form);
      } else {
        await api.createCategory(form);
      }
      setForm({ name: "", description: "" });
      setEditingCategory(null);
      setCategoryDialogMode(null);
      await load();
    } catch (err) {
      setDialogError(err.message);
    }
  }

  async function confirmDeleteCategory() {
    if (!categoryToDelete) {
      return;
    }

    setDialogError("");
    try {
      await api.deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      await load();
    } catch (err) {
      setDialogError(err.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Structure</span>
          <h1>Categories</h1>
        </div>
        <div className="page-header-actions">
          <p>Organize the catalog into clean buying paths.</p>
          <button className="primary-button" type="button" onClick={openCreateDialog}>
            <Plus size={17} />
            <span>Add category</span>
          </button>
        </div>
      </header>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="category-list">
        {categories.map((category) => (
          <article key={category.id} className="category-row">
            <div>
              <strong>{category.name}</strong>
              <span>{category.description || "No description"}</span>
            </div>
            <div className="row-actions">
              <button className="icon-button" onClick={() => openEditDialog(category)} type="button" aria-label={`Edit ${category.name}`}>
                <Edit3 size={16} />
              </button>
              <button className="icon-button danger" onClick={() => {
                setDialogError("");
                setCategoryToDelete(category);
              }} type="button" aria-label={`Delete ${category.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <Dialog
        open={Boolean(categoryDialogMode)}
        title={categoryDialogMode === "edit" ? "Edit category" : "Add category"}
        description="Keep product groups clear for browsing, filtering, and reporting."
        onClose={closeCategoryDialog}
      >
        <form className="dialog-form" onSubmit={submit}>
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
          {dialogError ? <p className="error-text dialog-error">{dialogError}</p> : null}
          <div className="dialog-actions">
            <button className="ghost-button" type="button" onClick={closeCategoryDialog}>
              Cancel
            </button>
            <button className="primary-button" type="submit">
              <Save size={17} />
              <span>{categoryDialogMode === "edit" ? "Save category" : "Add category"}</span>
            </button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        title="Delete category?"
        description={`Delete "${categoryToDelete?.name || "this category"}"? Products assigned to it will become unassigned.`}
        confirmLabel="Delete category"
        error={dialogError}
        onCancel={() => {
          setDialogError("");
          setCategoryToDelete(null);
        }}
        onConfirm={confirmDeleteCategory}
      />
    </section>
  );
}
