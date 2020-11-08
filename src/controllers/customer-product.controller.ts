import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CustomerProduct} from '../models';
import {CustomerProductRepository} from '../repositories';

export class CustomerProductController {
  constructor(
    @repository(CustomerProductRepository)
    public customerProductRepository : CustomerProductRepository,
  ) {}

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

  @get('/customer-products/count', {
    responses: {
      '200': {
        description: 'CustomerProduct model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CustomerProduct) where?: Where<CustomerProduct>,
  ): Promise<Count> {
    return this.customerProductRepository.count(where);
  }

  @get('/customer-products', {
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
    @param.filter(CustomerProduct) filter?: Filter<CustomerProduct>,
  ): Promise<CustomerProduct[]> {
    return this.customerProductRepository.find(filter);
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

  @get('/customer-products/{id}', {
    responses: {
      '200': {
        description: 'CustomerProduct model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CustomerProduct, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CustomerProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomerProduct>
  ): Promise<CustomerProduct> {
    return this.customerProductRepository.findById(id, filter);
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
}
