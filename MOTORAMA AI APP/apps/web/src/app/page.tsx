export default function Home() {
  return (
    <main>
      <h1>Motorama</h1>
      <p>Starter build is running.</p>
      <ul>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/compendium">Compendium</a></li>
      </ul>
      <p style={{ marginTop: 24 }}>
        Use Postman (docs/motorama_postman_collection.json from earlier) or curl to hit API routes.
      </p>
    </main>
  );
}
