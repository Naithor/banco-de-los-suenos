import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BancoDeLosSuenosDatabaseDataSource} from '../datasources';
import {CustomerProduct, CustomerProductRelations} from '../models';

export class CustomerProductRepository extends DefaultCrudRepository<
  CustomerProduct,
  typeof CustomerProduct.prototype.customerProductId,
  CustomerProductRelations
  > {
  constructor(
    @inject('datasources.bancoDeLosSuenosDatabase') dataSource: BancoDeLosSuenosDatabaseDataSource,
  ) {
    super(CustomerProduct, dataSource);
  }
}
