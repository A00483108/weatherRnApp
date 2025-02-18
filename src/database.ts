import * as SQLite from 'expo-sqlite';

// Open the database asynchronously
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('locations.db');
  return db;
};

// Function to create the table if it doesn't exist
export const createTable = async (): Promise<void> => {
  const db = await openDatabase();
  await db.withTransactionAsync(async () => {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT,
        latitude REAL,
        longitude REAL
      );`
    );
  });
};

// Function to save a location (city name and coordinates)
export const saveLocation = async (city: string, latitude: number, longitude: number): Promise<void> => {
  const db = await openDatabase();
  await db.withTransactionAsync(async () => {
    await db.runAsync('INSERT INTO locations (city, latitude, longitude) VALUES (?, ?, ?);', [city, latitude, longitude]);
  });
};

// Function to get all saved locations
export const getLocations = async (): Promise<Location[]> => {
  const db = await openDatabase();
  const result = await db.getAllAsync('SELECT * FROM locations;');
  return result as Location[];
};

// Function to get all saved locations
export const getLocationsByCity = async (city:string): Promise<Location> => {
    const db = await openDatabase();
    const result = await db.getFirstAsync('SELECT * FROM locations where city=?',[city]);
    return result as Location;
  };

// Function to delete a location by ID
export const deleteLocation = async (id: number): Promise<void> => {
  const db = await openDatabase();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM locations WHERE id = ?;', [id]);
  });
};

// Location interface to define the structure of saved location objects
export interface Location {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
}
