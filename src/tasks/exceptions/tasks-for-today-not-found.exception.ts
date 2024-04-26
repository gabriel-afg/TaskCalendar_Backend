import { NotFoundException } from '@nestjs/common';

export class TasksForTodayNotFoundException extends NotFoundException {
  constructor() {
    super(`Tasks for today not found`);
  }
}
