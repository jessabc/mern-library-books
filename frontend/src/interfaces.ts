export interface IBook {
  author: String;
  cover: String;
  title: String;
  summary: String;
  _id: Number;
}

export interface IBooks {
  books: IBook[];
}

export interface ILoans {
  loans: IUserLoan[];
}

export interface IUser {
  email: String;
  token: String;
  role: String;
}

export interface IUserObj {
  user: IUser | null;
}

export interface IMember {
  email: String;
  isAdmin: boolean;
  password: String;
  _id: String;
}

export interface IUserLoan {
  bookID: IBook;
  expireAt: string;
  userID: string;
  _id: string;
}

export interface IFile {
  lastModified: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
