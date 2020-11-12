import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
