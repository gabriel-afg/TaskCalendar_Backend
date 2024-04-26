import { NotFoundException } from '@nestjs/common';

export class TasksNotFoundException extends NotFoundException {
  constructor() {
    super(`Tasks not found`);
  }
}
