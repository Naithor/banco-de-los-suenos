import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomerProduct extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  customerProductId: number;

  @property({
    type: 'string',
    required: true,
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  productSate: string;


  constructor(data?: Partial<CustomerProduct>) {
    super(data);
  }
}

export interface CustomerProductRelations {
  // describe navigational properties here
}

export type CustomerProductWithRelations = CustomerProduct & CustomerProductRelations;
