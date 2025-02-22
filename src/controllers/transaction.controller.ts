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
import {Transaction} from '../models';
import {TransactionRepository} from '../repositories';
import {calculateAvaregeAmount} from '../services/transaction.service';

export class TransactionController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) { }

  @post('/transactions', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransaction',

          }),
        },
      },
    })
    transaction: Transaction,
  ): Promise<Transaction> {
    return this.transactionRepository.create(transaction);
  }

  @patch('/transactions', {
    responses: {
      '200': {
        description: 'Transaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Transaction,
    @param.where(Transaction) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.transactionRepository.updateAll(transaction, where);
  }

  @patch('/transactions/{id}', {
    responses: {
      '204': {
        description: 'Transaction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Transaction,
  ): Promise<void> {
    await this.transactionRepository.updateById(id, transaction);
  }

  @put('/transactions/{id}', {
    responses: {
      '204': {
        description: 'Transaction PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transaction: Transaction,
  ): Promise<void> {
    await this.transactionRepository.replaceById(id, transaction);
  }

  @del('/transactions/{id}', {
    responses: {
      '204': {
        description: 'Transaction DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transactionRepository.deleteById(id);
  }

  @get('/transactions/{productId}', {
    responses: {
      '200': {
        description: 'Array of Transaction model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Transaction, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('productId') productId: string,
    @param.filter(Transaction, {exclude: 'where'}) filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.find({where: {productId}});

    calculateAvaregeAmount(transactions);

    return this.transactionRepository.find({where: {productId}});
  }
}
