import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody
} from '@loopback/rest';
import {CustomerProduct} from '../models';
import {CustomerProductRepository} from '../repositories';

export class CustomerProductController {
  constructor(
    @repository(CustomerProductRepository)
    public customerProductRepository: CustomerProductRepository,
  ) { }

  @post('/customer-products', {
    responses: {
      '200': {
        description: 'CustomerProduct model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomerProduct)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerProduct, {
            title: 'NewCustomerProduct',
          }),
        },
      },
    })
    customerProduct: CustomerProduct,
  ): Promise<CustomerProduct> {
    return this.customerProductRepository.create(customerProduct);
  }

  @patch('/customer-products', {
    responses: {
      '200': {
        description: 'CustomerProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerProduct, {partial: true}),
        },
      },
    })
    customerProduct: CustomerProduct,
    @param.where(CustomerProduct) where?: Where<CustomerProduct>,
  ): Promise<Count> {
    return this.customerProductRepository.updateAll(customerProduct, where);
  }

  @patch('/customer-products/{id}', {
    responses: {
      '204': {
        description: 'CustomerProduct PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerProduct, {partial: true}),
        },
      },
    })
    customerProduct: CustomerProduct,
  ): Promise<void> {
    await this.customerProductRepository.updateById(id, customerProduct);
  }

  @put('/customer-products/{id}', {
    responses: {
      '204': {
        description: 'CustomerProduct PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customerProduct: CustomerProduct,
  ): Promise<void> {
    await this.customerProductRepository.replaceById(id, customerProduct);
  }

  @del('/customer-products/{id}', {
    responses: {
      '204': {
        description: 'CustomerProduct DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customerProductRepository.deleteById(id);
  }

  @get('/customer-products/{customerId}', {
    responses: {
      '200': {
        description: 'Array of CustomerProduct model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CustomerProduct, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('customerId') customerId: string,
    @param.filter(CustomerProduct, {exclude: 'where'}) filter?: Filter<CustomerProduct>,
  ): Promise<CustomerProduct[]> {
    return this.customerProductRepository.find({where: {customerId}});
  }
}
