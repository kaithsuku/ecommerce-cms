import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { orderStatusSchema, parseBody } from "../validators/schemas.js";

export function createOrderRoutes({ supabase, jwtSecret }) {
  const router = Router();
  router.use(requireAuth(jwtSecret));

  router.get("/", async (_req, res) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(id, name, image_url))")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ data: data || [] });
  });

  router.get("/:id", async (req, res) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(id, name, image_url))")
      .eq("id", req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json({ data });
  });

  router.put("/:id/status", async (req, res) => {
    const parsed = parseBody(orderStatusSchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status: parsed.data.status })
      .eq("id", req.params.id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ data });
  });

  return router;
}

