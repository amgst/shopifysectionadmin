import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let firestoreInstance: Firestore | undefined;
function initFirestore(): Firestore | undefined {
  if (firestoreInstance) return firestoreInstance;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyEnv) {
    console.warn(
      "Firebase credentials missing; falling back to in-memory storage.",
    );
    return undefined;
  }

  const privateKey = privateKeyEnv.replace(/\\n/g, "\n");
  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  firestoreInstance = getFirestore();
  return firestoreInstance;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}



export class FirebaseStorage implements IStorage {
  private db: Firestore;
  private collectionName = "users";

  constructor() {
    const db = initFirestore();
    if (!db) {
      throw new Error("Firebase not configured");
    }
    this.db = db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const snap = await this.db.collection(this.collectionName).doc(id).get();
    if (!snap.exists) return undefined;
    const data = snap.data()!;
    return { id: snap.id, username: data.username, password: data.password };
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const querySnap = await this.db
      .collection(this.collectionName)
      .where("username", "==", username)
      .limit(1)
      .get();

    if (querySnap.empty) return undefined;
    const doc = querySnap.docs[0];
    const data = doc.data();
    return { id: doc.id, username: data.username, password: data.password };
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { id, username: insertUser.username, password: insertUser.password };
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .set({ username: user.username, password: user.password });
    return user;
  }
}

export const storage: IStorage = new FirebaseStorage();
