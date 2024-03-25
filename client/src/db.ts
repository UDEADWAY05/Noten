import Dexie from 'dexie';

interface INote {
    id?: number,
    title: string,
    text: string,
    userId: number,
    date: number
}

interface IUser {
    id?: number;
    name: string;
    login: string;
    email: string;
    password: string;
    avatar: string;
    notes: number[]
}

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