export default async function CompendiumPage() {
  return (
    <main>
      <h2>Compendium</h2>
      <p>Import seed dataset via <code>POST /api/v1/compendium/seed/import</code>, then list with:</p>
      <ul>
        <li><code>GET /api/v1/compendium/vehicles?seed_rank_lte=100</code></li>
      </ul>
    </main>
  );
}
