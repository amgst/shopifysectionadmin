import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // Matches the previous express route: /api/health/storage
  res.status(200).json({ storage: 'none', mode: 'client' });
}
