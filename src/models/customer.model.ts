import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    length: 15
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
    length: 50
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
