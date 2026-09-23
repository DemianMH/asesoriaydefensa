import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");

function isNetlifyRuntime(): boolean {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
}

function seedPath(key: string): string {
  return path.join(process.cwd(), "src", "content", `${key}.json`);
}

function localPath(key: string): string {
  return path.join(DATA_DIR, `${key}.json`);
}

function readSeed<T>(key: string): T {
  return JSON.parse(fs.readFileSync(seedPath(key), "utf-8")) as T;
}

function readLocal<T>(key: string): T {
  const filePath = localPath(key);
  if (!fs.existsSync(filePath)) {
    return readSeed<T>(key);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeLocal<T>(key: string, value: T): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(localPath(key), JSON.stringify(value, null, 2), "utf-8");
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "adl-site-content", consistency: "strong" });
}

/** Reads a JSON content bucket, falling back to the seed file on first run. */
export async function readContent<T>(key: string): Promise<T> {
  if (isNetlifyRuntime()) {
    try {
      const store = await getBlobStore();
      const value = await store.get(key, { type: "json" });
      if (value === null || value === undefined) {
        const seed = readSeed<T>(key);
        await store.setJSON(key, seed);
        return seed;
      }
      return value as T;
    } catch {
      // Blobs not available in this context (e.g. local build) — fall back.
      return readLocal<T>(key);
    }
  }
  return readLocal<T>(key);
}

/** Persists a JSON content bucket to Netlify Blobs (production) or disk (local dev). */
export async function writeContent<T>(key: string, value: T): Promise<void> {
  if (isNetlifyRuntime()) {
    try {
      const store = await getBlobStore();
      await store.setJSON(key, value);
      return;
    } catch {
      writeLocal(key, value);
      return;
    }
  }
  writeLocal(key, value);
}
