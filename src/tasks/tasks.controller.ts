import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() data: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(data);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('/title/:title')
  findByTitle(@Param('title') title: string): Promise<Task[]> {
    return this.tasksService.findByTitle(title);
  }

  @Get('today')
  async findTasksForToday(): Promise<Task[]> {
    return this.tasksService.findTasksForToday();
  }

  @Get('week')
  async findTasksForThisWeek(): Promise<Task[]> {
    const tasks = await this.tasksService.findTasksForThisWeek();
    console.log('Controller result:', tasks);
    return tasks;
  }

  @Get('month')
  async findTasksForThisMonth(): Promise<Task[]> {
    return this.tasksService.findTasksForThisMonth();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }
}
