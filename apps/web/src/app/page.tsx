const productPillars = [
  {
    title: "Design Studio",
    description:
      "AI-guided ideation, sketch generation, and packaging studies tailored to your brand language and targets."
  },
  {
    title: "Engineering Intelligence",
    description:
      "Instant feasibility checks on aerodynamics, materials, manufacturing pathways, and regulatory readiness."
  },
  {
    title: "Compendium",
    description:
      "A living archive of every automobile ever built, connected by lineage, trims, and technological milestones."
  }
];

const workflow = [
  {
    title: "Discover",
    detail: "Scan market signals, competitor moves, and historic inspirations in a unified briefing space."
  },
  {
    title: "Design",
    detail: "Prototype exteriors, interiors, and UX flows with AI-generated variation sets."
  },
  {
    title: "Validate",
    detail: "Review compliance, sustainability, and supplier risk before greenlighting a program."
  },
  {
    title: "Deliver",
    detail: "Export ready-to-share briefs, patent drafts, and visual boards for cross-functional teams."
  }
];

const modules = [
  {
    title: "Concept Garage",
    detail: "Store early-stage ideas, sketches, and moodboards in a shared workspace."
  },
  {
    title: "SpecLab",
    detail: "Translate creative intent into powertrain, chassis, and safety spec sheets."
  },
  {
    title: "Heritage Explorer",
    detail: "Search by year, trim, platform, or design movement across global automakers."
  },
  {
    title: "Program Tracker",
    detail: "Monitor milestones, vendor readiness, and compliance checkpoints."
  }
];

const timeline = [
  {
    year: "1886",
    title: "Patent-Motorwagen",
    detail: "Baseline for the internal combustion era."
  },
  {
    year: "1955",
    title: "Jet age design",
    detail: "Aerodynamic cues redefine luxury silhouettes."
  },
  {
    year: "1997",
    title: "Hybrid breakthrough",
    detail: "Efficiency meets mainstream adoption."
  },
  {
    year: "2025",
    title: "Software-defined mobility",
    detail: "Digital platforms shape the next generation of vehicles."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Motorama AI Platform</p>
          <h1>Design, refine, and archive the future of mobility.</h1>
          <p className="lede">
            Motorama blends generative vehicle design with a global automotive compendium so your teams can build
            iconic cars with the right historical context, engineering signals, and creative momentum.
          </p>
          <div className="cta-row">
            <a className="primary" href="/projects">
              Start a concept sprint
            </a>
            <a className="secondary" href="/compendium">
              Explore the compendium
            </a>
          </div>
          <div className="hero-metrics">
            <div>
              <p className="metric">120+</p>
              <p className="metric-label">Design prompts available</p>
            </div>
            <div>
              <p className="metric">1886 - Today</p>
              <p className="metric-label">Automotive timeline</p>
            </div>
            <div>
              <p className="metric">24 hrs</p>
              <p className="metric-label">Avg. concept turnaround</p>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <h2>Project: Aurora GT</h2>
          <p className="card-lede">
            Track-ready grand tourer blending 1960s aero cues with modern EV packaging.
          </p>
          <ul>
            <li>Target range: 460 miles - Dual-motor AWD</li>
            <li>Materials: Bio-resin composite, recycled aluminum</li>
            <li>Key inspirations: Alfa 33 Stradale, Jaguar XJ13</li>
          </ul>
          <a className="ghost" href="/projects">
            Generate fresh sketch set
          </a>
        </div>
      </section>

      <section id="design" className="section">
        <div className="section-header">
          <h2>Motorama core pillars</h2>
          <p>
            From first sketch to production-ready brief, Motorama keeps creative, engineering, and strategy teams
            aligned.
          </p>
        </div>
        <div className="grid">
          {productPillars.map((pillar) => (
            <div key={pillar.title} className="card">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="compendium" className="section">
        <div className="section-header">
          <h2>Automotive Compendium</h2>
          <p>
            A living archive of every vehicle ever produced, connecting lineage, trims, technologies, and design
            movements.
          </p>
        </div>
        <div className="compendium">
          <div>
            <h3>Collections curated for your brands</h3>
            <p>
              Build private collections with internal prototypes, patents, and inspiration boards alongside public
              records.
            </p>
            <div className="tags">
              <span>Era lineage</span>
              <span>Trim taxonomy</span>
              <span>Powertrain evolution</span>
              <span>Design DNA</span>
            </div>
          </div>
          <div className="list">
            <div>
              <p className="list-title">1967 Concept Highlights</p>
              <p className="list-sub">Curated by Motorama AI</p>
            </div>
            <ol>
              <li>Plymouth XNR - asymmetrical roadster</li>
              <li>Ford Mach 2 - mid-engine fastback</li>
              <li>Alfa Romeo Carabo - wedge study</li>
              <li>GM Astro II - turbine concept</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>What you can build in Motorama</h2>
          <p>
            Organize programs, generate assets, and keep every concept connected to a living history of the automotive
            world.
          </p>
        </div>
        <div className="grid">
          {modules.map((module) => (
            <div key={module.title} className="card">
              <h3>{module.title}</h3>
              <p>{module.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="section">
        <div className="section-header">
          <h2>End-to-end workflow</h2>
          <p>
            From market research to production-ready documents, Motorama keeps design, engineering, and leadership in
            sync.
          </p>
        </div>
        <div className="grid">
          {workflow.map((step) => (
            <div key={step.title} className="card">
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section timeline">
        <div className="section-header">
          <h2>Timeline intelligence</h2>
          <p>Track design shifts, technology leaps, and market catalysts over more than a century.</p>
        </div>
        <div className="timeline-grid">
          {timeline.map((event) => (
            <div key={event.year} className="timeline-card">
              <p className="timeline-year">{event.year}</p>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta">
        <div>
          <h2>Ready to build your next vehicle program?</h2>
          <p>
            Motorama helps your automotive teams move from inspiration to production with confidence and speed.
          </p>
        </div>
        <a className="primary" href="/projects">
          Schedule a studio walkthrough
        </a>
      </section>
    </main>
  );
}
