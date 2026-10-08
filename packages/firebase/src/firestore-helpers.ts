import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  type QueryConstraint,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./client";

/** Generic: fetch every document in a collection, typed, optionally ordered/filtered. */
function assertPath(name: string, kind: "collection" | "document") {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error(`Firebase ${kind} path is empty. Check the CMS collection configuration.`);
  }
}

export async function getCollection<T extends DocumentData>(
  name: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> {
  assertPath(name, "collection");
  const q = query(collection(db, name), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocument<T extends DocumentData>(name: string, id: string): Promise<(T & { id: string }) | null> {
  assertPath(name, "document");
  if (!id.trim()) throw new Error("Firebase document id is empty.");
  const ref = doc(db, name, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null;
}

export async function createDocument<T extends DocumentData>(name: string, data: T) {
  assertPath(name, "collection");
  return addDoc(collection(db, name), data);
}

export async function updateDocument<T extends Partial<DocumentData>>(name: string, id: string, data: T) {
  assertPath(name, "document");
  if (!id.trim()) throw new Error("Firebase document id is empty.");
  return updateDoc(doc(db, name, id), data);
}

/** Create or fully replace a known document id. Useful for singleton CMS documents. */
export async function setDocument<T extends DocumentData>(name: string, id: string, data: T) {
  assertPath(name, "document");
  if (!id.trim()) throw new Error("Firebase document id is empty.");
  return setDoc(doc(db, name, id), data, { merge: true });
}

export async function deleteDocument(name: string, id: string) {
  assertPath(name, "document");
  if (!id.trim()) throw new Error("Firebase document id is empty.");
  return deleteDoc(doc(db, name, id));
}

export { orderBy, where };
