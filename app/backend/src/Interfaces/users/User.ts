import { Identi } from '..';

export interface Login { email: string; password: string; }
export interface User extends Identi, Login { username: string; role: string; }
