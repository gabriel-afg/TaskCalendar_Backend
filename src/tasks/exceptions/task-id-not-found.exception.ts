// exceptions/task-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';

export class TaskIdNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Task with ID ${id} not found`);
  }
}
