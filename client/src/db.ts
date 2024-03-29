import Dexie from 'dexie';
import { INote } from './types/INote';
import { IUser } from './types/IUser';

export class MyAppDatabase extends Dexie {
  users!: Dexie.Table<IUser, number>;
  notes!: Dexie.Table<INote, number>;

  constructor() {
    super("MyAppDatabase");

    this.version(1).stores({
        users: '++id, name, login, email, password, avatar, notes',
        notes: '++id, title, text, userId, date',
    });
  }
}

export const db = new MyAppDatabase();