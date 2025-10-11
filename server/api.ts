
import { Router } from 'express';
import { db } from './firebase';
import { insertActionSchema } from '../shared/schema';

const router = Router();

// GET /api/sections
router.get('/sections', async (_req, res, next) => {
  try {
    const snapshot = await db.collection('sections').get();
    const sections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(sections);
  } catch (err) {
    next(err);
  }
});

// POST /api/sections
router.post('/sections', async (req, res, next) => {
  try {
    const validatedData = insertActionSchema.parse(req.body);
    const docRef = await db.collection('sections').add(validatedData);
    res.status(201).json({ id: docRef.id, ...validatedData });
  } catch (err) {
    next(err);
  }
});

// PUT /api/sections/:id
router.put('/sections/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = insertActionSchema.parse(req.body);
    await db.collection('sections').doc(id).update(validatedData);
    res.json({ id, ...validatedData });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sections/:id
router.delete('/sections/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.collection('sections').doc(id).delete();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
