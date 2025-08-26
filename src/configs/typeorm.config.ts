import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  username: 'postgres',
  password: 'abgt2712',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
