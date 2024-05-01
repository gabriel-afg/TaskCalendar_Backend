import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './interfaces/task.interface';
import { TaskIdNotFoundException } from './exceptions/task-id-not-found.exception';
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
    return tasks.length ? tasks : [];
  }

  async findByTitle(title: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByTitle(title);
    return tasks.length ? tasks : [];
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
    return tasks.length ? tasks : [];
  }

  async findTasksForThisWeek(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksForThisWeek();
    return tasks.length ? tasks : [];
  }

  async findTasksForThisMonth(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksForThisMonth();
    return tasks.length ? tasks : [];
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
