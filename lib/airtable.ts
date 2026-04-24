// Tiny Airtable REST client. Uses raw fetch so:
//   - no extra dependency to manage
//   - Next.js can cache GETs via the `next: { revalidate }` option

const API_BASE = "https://api.airtable.com/v0";

type AirtableRecord<T> = {
  id: string;
  fields: T;
  createdTime: string;
};

type AirtableListResponse<T> = {
  records: AirtableRecord<T>[];
  offset?: string;
};

function config() {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) return null;
  return { token, baseId };
}

export function airtableConfigured(): boolean {
  return config() !== null;
}

export type { AirtableRecord };

export async function airtableList<T>(
  table: string,
  opts: {
    revalidate?: number;
    sort?: { field: string; direction?: "asc" | "desc" }[];
  } = {},
): Promise<AirtableRecord<T>[]> {
  const env = config();
  if (!env) return [];

  const records: AirtableRecord<T>[] = [];
  let next: string | undefined;

  do {
    const url = new URL(`${API_BASE}/${env.baseId}/${encodeURIComponent(table)}`);
    url.searchParams.set("pageSize", "100");
    opts.sort?.forEach((s, i) => {
      url.searchParams.set(`sort[${i}][field]`, s.field);
      url.searchParams.set(`sort[${i}][direction]`, s.direction ?? "asc");
    });
    if (next) url.searchParams.set("offset", next);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${env.token}` },
      next: { revalidate: opts.revalidate ?? 60 },
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        `Airtable list ${table} failed:`,
        res.status,
        await res.text().catch(() => ""),
      );
      return records;
    }
    const json = (await res.json()) as AirtableListResponse<T>;
    records.push(...json.records);
    next = json.offset;
  } while (next);

  return records;
}

export async function airtableCreate<T extends Record<string, unknown>>(
  table: string,
  fields: T,
): Promise<AirtableRecord<T> | null> {
  const env = config();
  if (!env) return null;

  const res = await fetch(`${API_BASE}/${env.baseId}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records: [{ fields }] }),
    cache: "no-store",
  });

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error(
      `Airtable create ${table} failed:`,
      res.status,
      await res.text().catch(() => ""),
    );
    return null;
  }
  const json = (await res.json()) as { records: AirtableRecord<T>[] };
  return json.records[0] ?? null;
}
