import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

export function Dialog({ open, title, description, children, onClose, size = "md" }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <section className={`dialog dialog-${size}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header className="dialog-header">
          <div>
            <h2 id="dialog-title">{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  error,
  onCancel,
  onConfirm
}) {
  return (
    <Dialog open={open} title={title} onClose={onCancel} size="sm">
      <div className="confirm-body">
        <span className="warning-icon" aria-hidden="true">
          <AlertTriangle size={20} />
        </span>
        <p>{description}</p>
      </div>
      {error ? <p className="error-text dialog-error">{error}</p> : null}
      <div className="dialog-actions">
        <button className="ghost-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="danger-button" type="button" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  );
}

