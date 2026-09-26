import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  type QueryConstraint,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./client";

/** Generic: fetch every document in a collection, typed, optionally ordered/filtered. */
export async function getCollection<T extends DocumentData>(
  name: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> {
  const q = query(collection(db, name), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

/** Generic: fetch one document by id. */
export async function getDocument<T extends DocumentData>(
  name: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const ref = doc(db, name, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null;
}

export async function createDocument<T extends DocumentData>(name: string, data: T) {
  return addDoc(collection(db, name), data);
}

export async function updateDocument<T extends Partial<DocumentData>>(
  name: string,
  id: string,
  data: T
) {
  return updateDoc(doc(db, name, id), data);
}

export async function deleteDocument(name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}

export { orderBy, where };
