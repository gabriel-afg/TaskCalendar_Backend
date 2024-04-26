import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../database/prisma.service';
import { TaskIdNotFoundException } from './exceptions/task-id-not-found.exception';
import { TasksForThisMonthNotFoundException } from './exceptions/tasks-for-this-month-not-found.exception';
import { TasksForThisWeekNotFoundException } from './exceptions/tasks-for-this-week-not-found.exception';
import { TasksForTodayNotFoundException } from './exceptions/tasks-for-today-not-found.exception';

describe('TasksService', () => {
  let service: TasksService;
  let repository: any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: any;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByTitle: jest.fn(),
      findOne: jest.fn(),
      findTasksForToday: jest.fn(),
      findTasksForThisWeek: jest.fn(),
      findTasksForThisMonth: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const prismaServiceMock = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: repositoryMock },
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should create a task', async () => {
    const dto: CreateTaskDto = {
      title: 'Task invalida',
      description: 'This is my first task',
      date: new Date('2024-05-01T10:00:00Z'),
      duration: new Date('2024-05-02T13:00:00Z'),
    };
    const task = { ...dto, id: 'some-id' };
    repository.create.mockResolvedValue(task);

    const result = await service.create(dto);

    expect(result).toEqual(task);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw an exception if no tasks for today are found', async () => {
    repository.findTasksForToday.mockResolvedValue([]);
    await expect(service.findTasksForToday()).rejects.toThrow(
      TasksForTodayNotFoundException,
    );
  });

  it('should throw an exception if no tasks for this week are found', async () => {
    repository.findTasksForThisWeek.mockResolvedValue([]);
    await expect(service.findTasksForThisWeek()).rejects.toThrow(
      TasksForThisWeekNotFoundException,
    );
  });

  it('should throw an exception if no tasks for this month are found', async () => {
    repository.findTasksForThisMonth.mockResolvedValue([]);
    await expect(service.findTasksForThisMonth()).rejects.toThrow(
      TasksForThisMonthNotFoundException,
    );
  });

  it('should throw an exception if task update fails', async () => {
    const id = 'testId';
    const data = { title: 'Test Task' };
    repository.update.mockResolvedValue(null);
    await expect(service.update(id, data)).rejects.toThrow(
      TaskIdNotFoundException,
    );
  });
});
