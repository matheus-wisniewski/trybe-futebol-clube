import { User } from './User';

export type MyUserModel = { findByEmail(email: string): Promise<User | null> };
