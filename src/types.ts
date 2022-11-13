export interface IComment {
  docId: string;
  userId: string;
  userName: string;
  photo: string;
  body: string;
  parent: null | string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
