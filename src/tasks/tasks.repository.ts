import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Task } from '@prisma/client';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findByTitle(title: string): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { title } });
  }

  async findOne(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async findTasksForToday(): Promise<Task[]> {
    const now = new Date();
    const startOfDayDate = startOfDay(now);
    const endOfDayDate = endOfDay(now);

    return this.prisma.task.findMany({
      where: {
        date: {
          gte: startOfDayDate,
          lte: endOfDayDate,
        },
      },
    });
  }

  async findTasksForThisWeek(): Promise<Task[]> {
    const now = new Date();
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });

    return this.prisma.task.findMany({
      where: {
        date: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
      },
    });
  }

  async findTasksForThisMonth(): Promise<Task[]> {
    const now = new Date();
    const startOfMonthDate = startOfMonth(now);
    const endOfMonthDate = endOfMonth(now);

    return this.prisma.task.findMany({
      where: {
        date: {
          gte: startOfMonthDate,
          lte: endOfMonthDate,
        },
      },
    });
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
