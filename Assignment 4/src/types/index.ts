export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  createdAt?: Date;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt?: Date;
}
