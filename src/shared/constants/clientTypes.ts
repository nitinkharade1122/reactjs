export interface ClientDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  userId: number;
}

export interface ClientCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  userId: number;
}

export interface ClientUpdateDto {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
}

export enum ClientEndpoints {
  BASE = 'api/Clients',
}
