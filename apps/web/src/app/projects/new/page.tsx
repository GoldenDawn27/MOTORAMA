"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/v1/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brand })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Unable to create project.");
      }

      router.push("/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="section">
        <div className="section-header">
          <h1>New Project</h1>
          <p>Launch a fresh concept sprint for your next vehicle program.</p>
        </div>
        <form className="card" onSubmit={handleSubmit}>
          <label className="form-field">
            Project name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Aurora GT"
              required
            />
          </label>
          <label className="form-field">
            Brand
            <input
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="Motorama"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <div className="cta-row">
            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create project"}
            </button>
            <button className="secondary" type="button" onClick={() => router.push("/projects")}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
