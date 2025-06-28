let counter = 1;
const state = {};
export const calls = {
  addDoc: [],
  setDoc: [],
  updateDoc: [],
  deleteDoc: [],
  getDoc: [],
  getDocs: [],
  query: [],
  doc: [],
  collection: [],
};
export const reset = () => {
  counter = 1;
  for (const k in calls) calls[k].length = 0;
  for (const k in state) delete state[k];
};
export function collection(db, path) {
  calls.collection.push(path);
  return { _path: path };
}
export function doc(db, ...segments) {
  const p = segments.join('/');
  calls.doc.push(p);
  return { _path: p };
}
export function serverTimestamp() {
  return Date.now();
}
export function increment(n) {
  return { __op: 'increment', n };
}
export function arrayUnion(...vals) {
  return { __op: 'arrayUnion', values: vals.flat() };
}
export function arrayRemove(...vals) {
  return { __op: 'arrayRemove', values: vals.flat() };
}
export function where(field, op, value) {
  return { type: 'where', field, op, value };
}
export function orderBy(field, dir) {
  return { type: 'orderBy', field, dir };
}
export function limit(n) {
  return { type: 'limit', n };
}
export function query(colRef, ...clauses) {
  const q = { colRef, clauses };
  calls.query.push(q);
  return q;
}
function applyOps(doc, data) {
  const out = { ...doc };
  for (const [k, v] of Object.entries(data)) {
    if (v && v.__op === 'increment') {
      out[k] = (out[k] || 0) + v.n;
    } else if (v && v.__op === 'arrayUnion') {
      const set = new Set(out[k] || []);
      v.values.forEach((val) => set.add(val));
      out[k] = Array.from(set);
    } else if (v && v.__op === 'arrayRemove') {
      out[k] = (out[k] || []).filter((x) => !v.values.includes(x));
    } else {
      out[k] = v;
    }
  }
  return out;
}
export async function addDoc(colRef, data) {
  const id = `doc${counter++}`;
  const path = `${colRef._path}/${id}`;
  state[path] = { ...data };
  calls.addDoc.push({ colRef, data });
  return { id, path };
}
export async function setDoc(docRef, data, opts = {}) {
  const existing = state[docRef._path] || {};
  state[docRef._path] = opts.merge ? { ...existing, ...data } : { ...data };
  calls.setDoc.push({ docRef, data, opts });
}
export async function updateDoc(docRef, data) {
  const existing = state[docRef._path] || {};
  state[docRef._path] = applyOps(existing, data);
  calls.updateDoc.push({ docRef, data });
}
export async function deleteDoc(docRef) {
  delete state[docRef._path];
  calls.deleteDoc.push({ docRef });
}
export async function getDoc(docRef) {
  calls.getDoc.push({ docRef });
  const data = state[docRef._path];
  return {
    exists: () => data !== undefined,
    data: () => data,
  };
}
export async function getDocs(q) {
  calls.getDocs.push({ q });
  const isCollection = Object.prototype.hasOwnProperty.call(q, '_path');
  const colPath = isCollection ? q._path : q.colRef._path;
  const clauses = isCollection ? [] : q.clauses;
  const docs = [];
  for (const [path, doc] of Object.entries(state)) {
    if (!path.startsWith(colPath + '/')) continue;
    let match = true;
    for (const clause of clauses) {
      if (clause.type === 'where') {
        if (clause.op === '==') {
          if (doc[clause.field] !== clause.value) match = false;
        }
      }
    }
    if (match) {
      docs.push({
        id: path.split('/').pop(),
        ref: { _path: path },
        data: () => doc,
        get: (field) => doc[field],
      });
    }
  }
  return { empty: docs.length === 0, docs };
}
export const _state = state;
