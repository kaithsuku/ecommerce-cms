import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export function createDashboardRoutes({ supabase, jwtSecret }) {
  const router = Router();
  router.use(requireAuth(jwtSecret));

  router.get("/stats", async (_req, res) => {
    const [{ data: products, error: productError }, { data: orders, error: orderError }] =
      await Promise.all([
        supabase.from("products").select("id, stock, status"),
        supabase.from("orders").select("id, status, total_amount")
      ]);

    if (productError || orderError) {
      return res.status(500).json({
        error: productError?.message || orderError?.message || "Unable to load dashboard"
      });
    }

    const productRows = products || [];
    const orderRows = orders || [];
    const revenue = orderRows
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    return res.json({
      data: {
        totalProducts: productRows.length,
        activeProducts: productRows.filter((product) => product.status === "active").length,
        lowStockProducts: productRows.filter((product) => product.stock > 0 && product.stock <= 5).length,
        outOfStockProducts: productRows.filter((product) => product.stock === 0).length,
        pendingOrders: orderRows.filter((order) => order.status === "pending").length,
        revenue
      }
    });
  });

  return router;
}

