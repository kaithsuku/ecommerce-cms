import jwt from "jsonwebtoken";

export function requireAuth(jwtSecret) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Missing bearer token" });
    }

    try {
      req.user = jwt.verify(token, jwtSecret);
      return next();
    } catch (_error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

