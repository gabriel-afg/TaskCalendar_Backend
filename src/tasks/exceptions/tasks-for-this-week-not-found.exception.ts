import { NotFoundException } from '@nestjs/common';

export class TasksForThisWeekNotFoundException extends NotFoundException {
  constructor() {
    super(`Tasks for this week not found`);
  }
}
