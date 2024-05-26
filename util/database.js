// helper functions to work with SQLite.

import * as SQLite from 'expo-sqlite';

// open a database.
export async function openDB() {
  return await SQLite.openDatabaseAsync('places.db');
}

// initialize the database.
export async function initDB(db) {
  return await db.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`
  );
}
