import { ID } from '.';

export interface CRUDModel<T> { findAll(): Promise<T[]>, findById(id: ID): Promise<T | null> }
