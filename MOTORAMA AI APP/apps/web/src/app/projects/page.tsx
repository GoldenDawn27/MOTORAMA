export default async function ProjectsPage() {
  return (
    <main>
      <h2>Projects</h2>
      <p>MVP UI is minimal. Create/list projects via API.</p>
      <p>Endpoints:</p>
      <ul>
        <li><code>POST /api/v1/projects</code></li>
        <li><code>GET /api/v1/projects/list</code></li>
      </ul>
    </main>
  );
}
