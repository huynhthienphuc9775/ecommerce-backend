import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Invitation } from './modules/invitation/invitation.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    InvitationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME ?? 'dev',
      password: process.env.DB_PASSWORD ?? 'dev123',
      database: process.env.DB_DATABASE ?? 'my_database',
      entities: [User, Invitation],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
