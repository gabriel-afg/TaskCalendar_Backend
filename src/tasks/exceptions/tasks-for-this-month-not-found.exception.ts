import { NotFoundException } from '@nestjs/common';

export class TasksForThisMonthNotFoundException extends NotFoundException {
  constructor() {
    super(`Tasks for this week not found`);
  }
}
