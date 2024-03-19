import Dexie from 'dexie';

interface INote {
    id?: string,
    title: string,
    text: string,
    userId: string,
    date: string
}

interface IUser {
    id?: string;
    name: string;
    login: string;
    email: string;
    password: string;
    avatar: string;
    notes: string[] | []
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