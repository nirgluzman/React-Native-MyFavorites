// helper functions to work with SQLite

import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

// open a database.
const db = await SQLite.openDatabaseAsync('places.db');

export async function initDB() {
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

  // const promise = new Promise((resolve, reject) => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS places (
  //         id INTEGER PRIMARY KEY NOT NULL,
  //         title TEXT NOT NULL,
  //         imageUri TEXT NOT NULL,
  //         address TEXT NOT NULL,
  //         lat REAL NOT NULL,
  //         lng REAL NOT NULL
  //       )`,
  //       [],
  //       () => {
  //         resolve();
  //       },
  //       (_, error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // });

  // return promise;
}
