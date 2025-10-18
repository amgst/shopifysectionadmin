import type { IncomingMessage, ServerResponse } from 'http';
import { insertActionSchema } from '../../shared/schema';
import { db } from '../../server/firebase';

async function readJson(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function extractId(req: any): string | undefined {
  // Vercel provides req.query for dynamic routes; fallback to URL parsing
  const qId = req?.query?.id as string | undefined;
  if (qId) return qId;
  const url = req?.url || '';
  const parts = url.split('?')[0].split('/');
  return parts[parts.length - 1] || undefined;
}

export default async function handler(req: IncomingMessage & { method?: string; query?: Record<string, string> }, res: ServerResponse & { status: (code: number) => ServerResponse; json: (body: any) => void }) {
  const method = (req.method || 'GET').toUpperCase();
  const id = extractId(req);

  // Polyfill res.status/json for Vercel Node functions if missing
  // @ts-ignore
  if (typeof res.status !== 'function') {
    // @ts-ignore
    res.status = (code: number) => {
      res.statusCode = code;
      return res;
    };
  }
  // @ts-ignore
  if (typeof res.json !== 'function') {
    // @ts-ignore
    res.json = (body: any) => {
      res.setHeader('Content-Type', 'application/json');
      // @ts-ignore
      res.end(JSON.stringify(body));
    };
  }

  if (!id) {
    return res.status(400).json({ message: 'Missing section id' });
  }

  try {
    if (method === 'PUT') {
      const raw = await readJson(req);
      const validated = insertActionSchema.parse(raw);
      await db.collection('sections').doc(id).update(validated);
      return res.status(200).json({ id, ...validated });
    }

    if (method === 'DELETE') {
      await db.collection('sections').doc(id).delete();
      res.statusCode = 204;
      return res.end();
    }

    res.setHeader('Allow', 'PUT, DELETE');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    const message = err?.message || 'Internal Server Error';
    return res.status(500).json({ message });
  }
}