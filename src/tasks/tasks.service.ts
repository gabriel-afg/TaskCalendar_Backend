import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './interfaces/task.interface';
import { TasksNotFoundException } from './exceptions/tasks-not-found.exception';
import { TaskIdNotFoundException } from './exceptions/task-id-not-found.exception';
import { TaskTitleNotFoundException } from './exceptions/task-title-not-found.exception';
import { TasksForTodayNotFoundException } from './exceptions/tasks-for-today-not-found.exception';
import { TasksForThisWeekNotFoundException } from './exceptions/tasks-for-this-week-not-found.exception';
import { TasksForThisMonthNotFoundException } from './exceptions/tasks-for-this-month-not-found.exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(data: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(data);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();
    if (!tasks.length) {
      throw new TasksNotFoundException();
    }
    return tasks;
  }

  async findByTitle(title: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByTitle(title);
    if (!tasks.length) {
      throw new TaskTitleNotFoundException(title);
    }
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new TaskIdNotFoundException(id);
    }
    return task;
  }

  async findTasksForToday(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksForToday();
    if (!tasks.length) {
      throw new TasksForTodayNotFoundException();
    }
    return tasks;
  }

  async findTasksForThisWeek(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksForThisWeek();
    if (!tasks.length) {
      throw new TasksForThisWeekNotFoundException();
    }
    return tasks;
  }

  async findTasksForThisMonth(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksForThisMonth();
    if (!tasks.length) {
      throw new TasksForThisMonthNotFoundException();
    }
    return tasks;
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.update(id, data);
    if (!task) {
      throw new TaskIdNotFoundException(id);
    }
    return task;
  }

  async remove(id: string): Promise<void> {
    const task = await this.tasksRepository.remove(id);
    if (task === null) {
      throw new TaskIdNotFoundException(id);
    }
  }
}
