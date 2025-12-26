import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import PageHeader from "@/components/PageHeader";
import { apiFetch } from "@/components/api";

type Project = {
  id?: string;
  name?: string;
  brand?: string;
  created_at?: string;
};

const getProjects = async (): Promise<{ projects: Project[]; error?: string }> => {
  const response = await apiFetch("/api/v1/projects/list");

  if (!response.ok) {
    return { projects: [], error: `Request failed with status ${response.status}.` };
  }

  const data = (await response.json()) as {
    projects?: Project[];
    items?: Project[];
  };

  return { projects: data.projects ?? data.items ?? [] };
};

export default async function ProjectsPage() {
  const { projects, error } = await getProjects();

  return (
    <main>
      <section className="section">
        <PageHeader
          title="Projects"
          subtitle="Active vehicle programs and AI-assisted concept sprints for your team."
          actions={
            <a className="primary" href="/projects/new">
              New Project
            </a>
          }
        />

        {error ? (
          <ErrorState title="Unable to load projects" description={error} />
        ) : projects.length === 0 ? (
          <EmptyState title="No projects yet" description="Create a new concept sprint to get started." />
        ) : (
          <div className="grid">
            {projects.map((project, index) => (
              <Card key={project.id ?? `${project.name}-${index}`}>
                <h3>{project.name ?? "Untitled program"}</h3>
                <p>{project.brand ?? "Brand pending"}</p>
                <p>{project.created_at ? new Date(project.created_at).toLocaleDateString() : "Date TBD"}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
