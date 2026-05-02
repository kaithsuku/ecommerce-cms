import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { parseBody, productSchema } from "../validators/schemas.js";

function normalizeProduct(product) {
  return {
    ...product,
    image_url: product.image_url || null,
    description: product.description || null,
    category_id: product.category_id || null
  };
}

export function createProductRoutes({ supabase, jwtSecret }) {
  const router = Router();
  router.use(requireAuth(jwtSecret));

  router.get("/", async (req, res) => {
    let query = supabase
      .from("products")
      .select("*, categories(id, name)")
      .order("created_at", { ascending: false });

    if (req.query.category_id) {
      query = query.eq("category_id", req.query.category_id);
    }
    if (req.query.status) {
      query = query.eq("status", req.query.status);
    }
    if (req.query.search && typeof query.ilike === "function") {
      query = query.ilike("name", `%${req.query.search}%`);
    }

    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    let rows = data || [];
    if (req.query.stock === "low") {
      rows = rows.filter((product) => product.stock > 0 && product.stock <= 5);
    }
    if (req.query.stock === "out") {
      rows = rows.filter((product) => product.stock === 0);
    }

    return res.json({ data: rows });
  });

  router.get("/:id", async (req, res) => {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(id, name)")
      .eq("id", req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({ data });
  });

  router.post("/", async (req, res) => {
    const parsed = parseBody(productSchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { data, error } = await supabase
      .from("products")
      .insert([normalizeProduct(parsed.data)])
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ data });
  });

  router.put("/:id", async (req, res) => {
    const parsed = parseBody(productSchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { data, error } = await supabase
      .from("products")
      .update({ ...normalizeProduct(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", req.params.id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ data });
  });

  router.delete("/:id", async (req, res) => {
    const { error } = await supabase.from("products").delete().eq("id", req.params.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(204).send();
  });

  return router;
}

