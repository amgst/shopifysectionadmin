import type { IncomingMessage, ServerResponse } from 'http';
import { insertActionSchema } from '../shared/schema';
import { db } from '../server/firebase';

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

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse & { status: (code: number) => ServerResponse; json: (body: any) => void }) {
  const method = (req.method || 'GET').toUpperCase();

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

  try {
    if (method === 'GET') {
      const snapshot = await db.collection('sections').get();
      const sections = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(sections);
    }

    if (method === 'POST') {
      const raw = await readJson(req);
      const validated = insertActionSchema.parse(raw);
      const docRef = await db.collection('sections').add(validated);
      return res.status(201).json({ id: docRef.id, ...validated });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    const message = err?.message || 'Internal Server Error';
    return res.status(500).json({ message });
  }
}