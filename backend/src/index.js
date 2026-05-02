import "dotenv/config";
import { createApp } from "./app.js";
import { createSupabaseClient } from "./supabaseClient.js";

const port = Number(process.env.PORT || 4000);

const app = createApp({
  adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  supabase: createSupabaseClient()
});

app.listen(port, () => {
  console.log(`Ecommerce CMS API running on http://localhost:${port}`);
});

