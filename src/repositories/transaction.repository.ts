import {DefaultCrudRepository} from '@loopback/repository';
import {Transaction, TransactionRelations} from '../models';
import {BancoDeLosSuenosDatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.transactionId,
  TransactionRelations
> {
  constructor(
    @inject('datasources.bancoDeLosSuenosDatabase') dataSource: BancoDeLosSuenosDatabaseDataSource,
  ) {
    super(Transaction, dataSource);
  }
}
