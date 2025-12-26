import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import PageHeader from "@/components/PageHeader";
import { apiFetch } from "@/components/api";

type Vehicle = {
  id?: string;
  brand_id?: string;
  model_name?: string;
  year_start?: number;
  year_end?: number | null;
  seed_rank?: number;
};

const getVehicles = async (): Promise<{ vehicles: Vehicle[]; error?: string }> => {
  const response = await apiFetch("/api/v1/compendium/vehicles?seed_rank_lte=100");

  if (!response.ok) {
    return { vehicles: [], error: `Request failed with status ${response.status}.` };
  }

  const data = (await response.json()) as {
    vehicles?: Vehicle[];
    items?: Vehicle[];
  };

  return { vehicles: data.vehicles ?? data.items ?? [] };
};

const formatYears = (vehicle: Vehicle) => {
  if (!vehicle.year_start) {
    return "Years unavailable";
  }

  if (!vehicle.year_end || vehicle.year_end === vehicle.year_start) {
    return `${vehicle.year_start}`;
  }

  return `${vehicle.year_start}–${vehicle.year_end}`;
};

export default async function CompendiumPage() {
  const { vehicles, error } = await getVehicles();

  return (
    <main>
      <section className="section">
        <PageHeader
          title="Compendium"
          subtitle="Historic vehicles, trims, and design movements curated by Motorama AI."
        />

        <Card>
          <h3>Seed data</h3>
          <p>Import curated vehicles with POST /api/v1/compendium/seed/import.</p>
        </Card>

        {error ? (
          <ErrorState title="Unable to load compendium" description={error} />
        ) : vehicles.length === 0 ? (
          <EmptyState
            title="Compendium not seeded yet"
            description="Run the seed import endpoint to populate the catalog."
          />
        ) : (
          <div className="grid">
            {vehicles.map((vehicle, index) => (
              <Card key={vehicle.id ?? `${vehicle.brand_id}-${vehicle.model_name}-${index}`}>
                <h3>{vehicle.model_name ?? "Unknown model"}</h3>
                <p>{vehicle.brand_id ?? "Brand TBD"}</p>
                <p>{formatYears(vehicle)}</p>
                <p>Seed rank: {vehicle.seed_rank ?? "n/a"}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
