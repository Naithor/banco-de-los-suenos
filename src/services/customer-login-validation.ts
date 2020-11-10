import {HttpErrors} from '@loopback/rest';
import {Customer} from '../models';

export function validateLoginCredentials(customer: Customer, password: string) {
  if (!customer) {
    throw new HttpErrors.NotFound('Usuario o contraseña invalido');
  }

  if (customer?.password !== password) {
    throw new HttpErrors.NotFound('Usuario o contraseña invalido');
  }
}
