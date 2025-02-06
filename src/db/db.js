const DB_NAME = 'ScoresDB';
const DB_VERSION = 1;
const STORE_NAME = 'scores';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.add({ id: 1, x: 0, o: 0 });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getScores() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(1);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function increment(X, O) {
    const db = await openDB();
    const scores = await getScores();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const updatedScores = {
            ...scores,
            x: scores.x + X,
            o: scores.o + O
        };

        const request = store.put(updatedScores);
        request.onsuccess = () => resolve(updatedScores);
        request.onerror = () => reject(request.error);
    });
}

export async function reset() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const resetScores = { id: 1, x: 0, o: 0 };

        const request = store.put(resetScores);
        request.onsuccess = () => resolve(resetScores);
        request.onerror = () => reject(request.error);
    });
}