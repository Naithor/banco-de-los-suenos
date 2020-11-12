import {DefaultCrudRepository} from '@loopback/repository';
import {Product, ProductRelations} from '../models';
import {BancoDeLosSuenosDatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  ProductRelations
> {
  constructor(
    @inject('datasources.bancoDeLosSuenosDatabase') dataSource: BancoDeLosSuenosDatabaseDataSource,
  ) {
    super(Product, dataSource);
  }
}
