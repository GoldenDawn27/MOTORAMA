import { promises as fs } from "fs";
import path from "path";

export type ProjectRecord = {
  id: string;
  name: string;
  brand: string;
  created_at: string;
};

export type VehicleRecord = {
  id: string;
  brand_id: string;
  model_name: string;
  year_start: number;
  year_end?: number | null;
  seed_rank?: number;
};

type DataStore = {
  projects: ProjectRecord[];
  vehicles: VehicleRecord[];
};

const DEFAULT_DATA: DataStore = {
  projects: [],
  vehicles: []
};

const getDataPath = () => {
  const root = process.cwd();
  return path.join(root, "apps", "web", ".data", "motorama.json");
};

const ensureDataFile = async () => {
  const dataPath = getDataPath();
  const dir = path.dirname(dataPath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify(DEFAULT_DATA, null, 2));
  }

  return dataPath;
};

export const readData = async (): Promise<DataStore> => {
  const dataPath = await ensureDataFile();
  const contents = await fs.readFile(dataPath, "utf8");

  try {
    const parsed = JSON.parse(contents) as DataStore;
    return {
      projects: parsed.projects ?? [],
      vehicles: parsed.vehicles ?? []
    };
  } catch {
    return DEFAULT_DATA;
  }
};

export const writeData = async (data: DataStore) => {
  const dataPath = await ensureDataFile();
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};
