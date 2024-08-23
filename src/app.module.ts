import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config/config.schema';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ToDoListsModule } from './to-do-lists/to-do-lists.module';
import { TaskItemModule } from './task-item/task-item.module';
import { TaskItemStatusModule } from './task-item-status/task-item-status.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    UsersModule,
    ToDoListsModule,
    TaskItemModule,
    TaskItemStatusModule,
  ],
  providers: [],
})
export class AppModule {}
