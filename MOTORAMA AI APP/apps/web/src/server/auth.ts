import { NextRequest } from "next/server";

export function requireAuth(req: NextRequest) {
  const expected = process.env.AUTH_API_KEY;
  if (!expected) return;
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== expected) {
    throw new Response(JSON.stringify({ error: "unauthorized", message: "Invalid API key" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
}
