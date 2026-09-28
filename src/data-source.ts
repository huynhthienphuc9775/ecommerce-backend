import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './modules/user/user.entity';
import { Invitation } from './modules/invitation/invitation.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME ?? 'dev',
  password: process.env.DB_PASSWORD ?? 'dev123',
  database: process.env.DB_DATABASE ?? 'my_database',
  entities: [User, Invitation],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
};

// Used by the TypeORM CLI (migration:generate / migration:run).
export default new DataSource(dataSourceOptions);
