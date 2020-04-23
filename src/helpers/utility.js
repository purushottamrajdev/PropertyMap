const DATABASE_NAME = "LINKUP_DB";
const DATABASE_VERSION = 1;
const DATABASE_OFFLINE_STORE = "timesheet";

var DBOpenRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
var dbRef;
DBOpenRequest.onsuccess = function (e) {
    dbRef = DBOpenRequest.result;
}

DBOpenRequest.onupgradeneeded = (e) => {
    let db = DBOpenRequest.result;
    // to store the offline-post-timesheet
    if (!db.objectStoreNames.contains(DATABASE_OFFLINE_STORE)) { // if there's no "books" store
        db.createObjectStore(DATABASE_OFFLINE_STORE, { keyPath: 'reqId' }); // create it
    }
    // let deleteRequest = indexedDB.deleteDatabase(name)
}

DBOpenRequest.onerror = (er) => {
    // 
}

export function writeData(storeName, data) {
    let tx = dbRef.transaction(storeName, "readwrite"); // (1)
    // get an object store to operate on it
    let timesheetStore = tx.objectStore(storeName); // (2)
    let request = timesheetStore.add(data); // (3)
    request.onsuccess = function () { // (4)
        alert("You are offline Data is store for feature Re-request");
    };
    request.onerror = function () {
        alert("Fail to store offline Data ");
    }
}

export function readAllData(storeName) {
    let tx = dbRef.transaction(storeName, "readonly"); // (1)
    let store = tx.objectStore(storeName);
    console.log("insed index read utility function ", store);
    return store.getAll();
}

// export function clearAllData(st) {
//     return dbPromise
//         .then(function (db) {
//             var tx = db.transaction(st, 'readwrite');
//             var store = tx.objectStore(st);
//             store.clear();
//             return tx.complete;
//         });
// }

// export function deleteItemFromData(st, id) {
//     dbPromise
//         .then(function (db) {
//             var tx = db.transaction(st, 'readwrite');
//             var store = tx.objectStore(st);
//             store.delete(id);
//             return tx.complete;
//         })
//         .then(function () {
//             console.log('Item deleted!');
//         });
// }

