import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'bancoDeLosSuenosDatabase',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'bancoDeLosSuenosDatabase'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BancoDeLosSuenosDatabaseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'bancoDeLosSuenosDatabase';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.bancoDeLosSuenosDatabase', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
