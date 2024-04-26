import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TasksRepository } from './tasks.repository';

@Module({
  providers: [TasksService, PrismaService, TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
