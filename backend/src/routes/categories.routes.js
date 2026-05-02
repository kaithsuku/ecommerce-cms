import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { categorySchema, parseBody } from "../validators/schemas.js";

export function createCategoryRoutes({ supabase, jwtSecret }) {
  const router = Router();
  router.use(requireAuth(jwtSecret));

  router.get("/", async (_req, res) => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ data: data || [] });
  });

  router.post("/", async (req, res) => {
    const parsed = parseBody(categorySchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([parsed.data])
      .select("*")
      .single();

    if (error) {
      return res.status(409).json({ error: error.message });
    }

    return res.status(201).json({ data });
  });

  router.put("/:id", async (req, res) => {
    const parsed = parseBody(categorySchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { data, error } = await supabase
      .from("categories")
      .update(parsed.data)
      .eq("id", req.params.id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ data });
  });

  router.delete("/:id", async (req, res) => {
    const { error } = await supabase.from("categories").delete().eq("id", req.params.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(204).send();
  });

  return router;
}

